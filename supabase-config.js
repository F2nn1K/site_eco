/**
 * Configuração do Supabase para a seção "Trabalhe Conosco"
 * 
 * Para configurar o Supabase:
 * 1. Crie uma conta no Supabase (https://supabase.com)
 * 2. Crie um novo projeto
 * 3. Substitua as variáveis abaixo pelas suas configurações
 * 4. Execute o SQL schema fornecido no seu banco de dados
 * 5. Configure as políticas de segurança (RLS)
 */

// Configurações do Supabase (substitua pelas suas)
const SUPABASE_CONFIG = {
    url: 'https://seu-projeto.supabase.co',
    anonKey: 'sua-chave-anonima-aqui',
    bucketName: 'careers-resumes'
};

// Inicializar Supabase (descomente quando configurar)
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

/**
 * SQL SCHEMA PARA CRIAR AS TABELAS
 * 
 * Execute este SQL no SQL Editor do Supabase:
 */

const SQL_SCHEMA = `
-- Tabela para armazenar candidaturas
CREATE TABLE job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    position VARCHAR(100) NOT NULL,
    message TEXT,
    resume_url TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address VARCHAR(45),
    user_agent TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_job_applications_email ON job_applications(email);
CREATE INDEX idx_job_applications_position ON job_applications(position);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_submitted_at ON job_applications(submitted_at);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_job_applications_updated_at 
    BEFORE UPDATE ON job_applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Tabela para rate limiting
CREATE TABLE submission_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    email VARCHAR(255),
    attempt_count INTEGER DEFAULT 1,
    last_attempt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    blocked_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para rate limiting
CREATE INDEX idx_submission_attempts_ip ON submission_attempts(ip_address);
CREATE INDEX idx_submission_attempts_email ON submission_attempts(email);
CREATE INDEX idx_submission_attempts_last_attempt ON submission_attempts(last_attempt);

-- Habilitar Row Level Security (RLS)
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_attempts ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança

-- Permitir apenas inserção de candidaturas (não leitura/edição)
CREATE POLICY "Allow insert applications" ON job_applications
    FOR INSERT WITH CHECK (true);

-- Permitir inserção e atualização de tentativas (para rate limiting)
CREATE POLICY "Allow submission attempts tracking" ON submission_attempts
    FOR ALL USING (true);

-- Storage bucket para currículos
INSERT INTO storage.buckets (id, name, public)
VALUES ('careers-resumes', 'careers-resumes', false);

-- Política de storage para upload de currículos
CREATE POLICY "Allow resume uploads" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'careers-resumes');

-- Política para leitura de currículos (apenas para admin)
CREATE POLICY "Allow resume downloads for admin" ON storage.objects
    FOR SELECT USING (bucket_id = 'careers-resumes' AND auth.role() = 'authenticated');
`;

/**
 * CONFIGURAÇÃO DE SEGURANÇA ADICIONAL
 */

// Rate limiting avançado no servidor (opcional)
const RATE_LIMIT_CONFIG = {
    windowMs: 15 * 60 * 1000, // 15 minutos
    maxAttempts: 3, // máximo 3 tentativas por IP
    blockDuration: 60 * 60 * 1000, // bloquear por 1 hora
    emailLimit: 1, // 1 candidatura por e-mail por dia
    ipLimit: 5 // 5 candidaturas por IP por dia
};

// Configuração de validação de arquivos
const FILE_VALIDATION = {
    maxSize: 1 * 1024 * 1024, // 1MB
    allowedTypes: ['application/pdf'],
    allowedExtensions: ['.pdf'],
    scanForMalware: true // recomendado para produção
};

// Lista de domínios de e-mail temporários para bloquear
const BLOCKED_EMAIL_DOMAINS = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com',
    'temp-mail.org'
];

/**
 * EXEMPLO DE IMPLEMENTAÇÃO COMPLETA DO SUPABASE
 */

// Função para upload de arquivo (substitua no script.js)
async function uploadFileToSupabaseExample(file) {
    try {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `resumes/${fileName}`;

        const { data, error } = await supabase.storage
            .from(SUPABASE_CONFIG.bucketName)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type
            });

        if (error) throw error;

        // Obter URL assinada (válida por 1 hora)
        const { data: urlData, error: urlError } = await supabase.storage
            .from(SUPABASE_CONFIG.bucketName)
            .createSignedUrl(filePath, 3600);

        if (urlError) throw urlError;

        return {
            path: filePath,
            signedUrl: urlData.signedUrl
        };
    } catch (error) {
        console.error('Erro no upload:', error);
        throw new Error('Erro ao fazer upload do currículo');
    }
}

// Função para submeter candidatura (substitua no script.js)
async function submitToSupabaseExample(data) {
    try {
        // Verificar rate limiting
        await checkRateLimit(data.ip_address, data.email);

        // Inserir candidatura
        const { data: applicationData, error } = await supabase
            .from('job_applications')
            .insert([{
                name: data.name,
                email: data.email,
                phone: data.phone,
                position: data.position,
                resume_url: data.resume_url,
                ip_address: data.ip_address,
                user_agent: data.user_agent
            }])
            .select();

        if (error) throw error;

        // Atualizar contador de tentativas
        await updateSubmissionAttempts(data.ip_address, data.email);

        return applicationData;
    } catch (error) {
        console.error('Erro na submissão:', error);
        throw error;
    }
}

// Função para verificar rate limiting
async function checkRateLimit(ipAddress, email) {
    const now = new Date();
    const windowStart = new Date(now.getTime() - RATE_LIMIT_CONFIG.windowMs);

    // Verificar tentativas por IP
    const { data: ipAttempts, error: ipError } = await supabase
        .from('submission_attempts')
        .select('*')
        .eq('ip_address', ipAddress)
        .gte('last_attempt', windowStart.toISOString());

    if (ipError) throw ipError;

    if (ipAttempts && ipAttempts.length >= RATE_LIMIT_CONFIG.maxAttempts) {
        throw new Error('Muitas tentativas. Tente novamente mais tarde.');
    }

    // Verificar candidaturas por e-mail (uma por dia)
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const { data: emailAttempts, error: emailError } = await supabase
        .from('job_applications')
        .select('*')
        .eq('email', email)
        .gte('submitted_at', dayStart.toISOString());

    if (emailError) throw emailError;

    if (emailAttempts && emailAttempts.length >= RATE_LIMIT_CONFIG.emailLimit) {
        throw new Error('Você já enviou uma candidatura hoje. Aguarde 24 horas.');
    }
}

// Função para atualizar tentativas
async function updateSubmissionAttempts(ipAddress, email) {
    const { error } = await supabase
        .from('submission_attempts')
        .upsert({
            ip_address: ipAddress,
            email: email,
            last_attempt: new Date().toISOString()
        }, {
            onConflict: 'ip_address,email'
        });

    if (error) console.error('Erro ao atualizar tentativas:', error);
}

/**
 * INSTRUÇÕES DE DEPLOY
 * 
 * 1. Configure as variáveis de ambiente:
 *    - SUPABASE_URL
 *    - SUPABASE_ANON_KEY
 * 
 * 2. Execute o schema SQL no Supabase
 * 
 * 3. Configure as políticas de RLS
 * 
 * 4. Teste todas as funcionalidades
 * 
 * 5. Configure backup automático dos dados
 * 
 * 6. Configure monitoramento e alertas
 */

export {
    SUPABASE_CONFIG,
    SQL_SCHEMA,
    RATE_LIMIT_CONFIG,
    FILE_VALIDATION,
    BLOCKED_EMAIL_DOMAINS,
    uploadFileToSupabaseExample,
    submitToSupabaseExample
}; 