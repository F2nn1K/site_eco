# Seção "Trabalhe Conosco" - Econorte

## 📋 Visão Geral

A seção "Trabalhe Conosco" foi implementada conforme as especificações do Auto Posto Estrela D'Alva, incluindo:

- **Layout em Grid Responsivo**: 2 colunas no desktop, 1 coluna no mobile
- **Card de Vagas Disponíveis**: Com ícones coloridos e botão WhatsApp
- **Formulário de Envio**: Com validação em tempo real e upload de currículo
- **Sistema de Segurança**: Honeypot, rate limiting e validações avançadas
- **Integração Supabase**: Para upload de arquivos e armazenamento de dados

## 🎨 Design e Cores

### Cores da Marca
- **Vermelho**: `#D9251A` (principal)
- **Amarelo**: `#F7C700` (secundário)
- **Cinza**: `#F1F2F2` (fundo)
- **Verde WhatsApp**: `#25d366`

### Layout Responsivo
- **Desktop**: Grid 2 colunas com gap de 3rem
- **Tablet**: 1 coluna empilhada
- **Mobile**: Layout adaptado com padding reduzido

## 🔧 Funcionalidades Implementadas

### 1. Card de Vagas Disponíveis
- ✅ Fundo branco com borda vermelha sutil
- ✅ Ícones coloridos para cada vaga (vermelho, verde, roxo)
- ✅ Lista de vagas com descrições detalhadas
- ✅ Botão WhatsApp verde integrado

### 2. Formulário de Candidatura
- ✅ Fundo cinza claro (#f9fafb)
- ✅ Campos: Nome, Email, Telefone, Cargo, Currículo
- ✅ Campo honeypot oculto para segurança
- ✅ Validação em tempo real de todos os campos
- ✅ Upload de arquivos PDF com drag & drop
- ✅ Botão com gradiente vermelho/laranja

### 3. Validações JavaScript
- ✅ **Email**: Formato RFC válido
- ✅ **Telefone**: Formato brasileiro (95) 99999-9999
- ✅ **Nome**: Apenas letras e espaços, mínimo 3 caracteres
- ✅ **Arquivo**: Apenas PDF, máximo 5MB
- ✅ **Campos obrigatórios**: Verificação em tempo real

### 4. Sistema de Segurança
- ✅ **Honeypot**: Campo oculto para detectar bots
- ✅ **Rate Limiting**: 3 tentativas por minuto por IP
- ✅ **Sanitização**: Limpeza de inputs contra XSS
- ✅ **CSRF Protection**: Tokens de segurança
- ✅ **Validação de domínios**: Bloqueio de emails temporários

### 5. Integração Supabase
- ✅ Upload seguro de currículos
- ✅ Armazenamento de candidaturas
- ✅ Row Level Security (RLS)
- ✅ Rate limiting no banco de dados
- ✅ Backup automático

## 🚀 Como Configurar

### 1. Configuração do Supabase

1. **Criar Conta e Projeto**:
   ```bash
   # Acesse https://supabase.com
   # Crie uma nova conta
   # Crie um novo projeto
   ```

2. **Executar Schema SQL**:
   - Abra o SQL Editor no Supabase
   - Execute o código em `supabase-config.js`
   - Verifique se as tabelas foram criadas

3. **Configurar Variáveis**:
   ```javascript
   // No script.js, substitua:
   const SUPABASE_URL = 'https://seu-projeto.supabase.co';
   const SUPABASE_ANON_KEY = 'sua-chave-anonima-aqui';
   ```

### 2. Configuração de Segurança

1. **Row Level Security (RLS)**:
   ```sql
   -- Já incluído no schema
   ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
   ```

2. **Políticas de Storage**:
   ```sql
   -- Política para upload de currículos
   CREATE POLICY "Allow resume uploads" ON storage.objects
   FOR INSERT WITH CHECK (bucket_id = 'careers-resumes');
   ```

### 3. Configuração de Email (Opcional)

Para notificações por email, configure:
```javascript
// Webhook para notificar RH sobre novas candidaturas
const WEBHOOK_URL = 'https://seu-webhook.com/new-application';
```

## 📱 Responsividade

### Breakpoints
- **Desktop**: `≥1024px` - Grid 2 colunas
- **Tablet**: `768px-1023px` - 1 coluna
- **Mobile**: `≤767px` - Layout móvel
- **Pequeno**: `≤480px` - Ajustes extras

### Adaptações Mobile
- Padding reduzido nas seções
- Ícones e texto redimensionados
- Botões adaptados para touch
- Notificações em tela cheia

## 🔐 Segurança Implementada

### Proteção Frontend
1. **Honeypot Field**: Campo oculto para detectar bots
2. **Rate Limiting**: Limite de tentativas por tempo
3. **Validação em Tempo Real**: Feedback imediato
4. **Sanitização**: Limpeza de inputs maliciosos

### Proteção Backend
1. **Row Level Security**: Controle de acesso no banco
2. **Rate Limiting Avançado**: Por IP e email
3. **Validação de Arquivos**: Tipo e tamanho
4. **Logs de Auditoria**: Rastreamento de tentativas

## 🎯 SEO e Performance

### Meta Tags
```html
<title>Trabalhe Conosco - Econorte</title>
<meta name="description" content="Faça parte da equipe Econorte. Vagas em vendas, logística e administração.">
```

### Performance
- Lazy loading de imagens
- Minificação de CSS/JS
- Compressão de arquivos
- Cache estratégico

## 🧪 Testes Recomendados

### Testes Manuais
1. **Formulário**:
   - [ ] Validação de todos os campos
   - [ ] Upload de arquivo PDF
   - [ ] Envio com sucesso
   - [ ] Tratamento de erros

2. **Responsividade**:
   - [ ] Desktop (1920x1080)
   - [ ] Tablet (768x1024)
   - [ ] Mobile (375x667)
   - [ ] Orientação landscape

3. **Segurança**:
   - [ ] Campo honeypot funcional
   - [ ] Rate limiting ativo
   - [ ] Validação de arquivos
   - [ ] Sanitização de inputs

### Testes Automatizados
```javascript
// Exemplo de teste com Jest
describe('Careers Form', () => {
  test('validates email format', () => {
    expect(validateEmail('test@email.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });
});
```

## 📊 Analytics e Monitoramento

### Eventos para Rastrear
```javascript
// Google Analytics 4
gtag('event', 'form_submit', {
  event_category: 'careers',
  event_label: 'application_sent'
});

// Métricas importantes:
// - Taxa de conversão do formulário
// - Abandono por campo
// - Tempo de preenchimento
// - Dispositivos mais usados
```

### Dashboard Supabase
- Candidaturas por dia/semana/mês
- Cargos mais procurados
- Taxa de upload de currículos
- Tentativas bloqueadas por segurança

## 🐛 Troubleshooting

### Problemas Comuns

1. **Upload de arquivo não funciona**:
   ```javascript
   // Verificar configuração do bucket
   // Verificar políticas de storage
   // Verificar tamanho do arquivo
   ```

2. **Validação não aparece**:
   ```javascript
   // Verificar se Lucide icons está carregado
   // Verificar console para erros JavaScript
   ```

3. **Formulário não envia**:
   ```javascript
   // Verificar conexão com Supabase
   // Verificar rate limiting
   // Verificar políticas RLS
   ```

### Logs de Debug
```javascript
// Ativar logs detalhados
localStorage.setItem('debug_careers', 'true');
```

## 🔄 Próximas Melhorias

### Funcionalidades Futuras
- [ ] Dashboard admin para RH
- [ ] Notificações push
- [ ] Integração com ATS
- [ ] Análise automática de currículos
- [ ] Agendamento de entrevistas
- [ ] Portal do candidato

### Otimizações
- [ ] Service Worker para offline
- [ ] Progressive Web App (PWA)
- [ ] Lazy loading avançado
- [ ] Otimização de imagens WebP

## 📞 Suporte

Para suporte técnico ou dúvidas sobre a implementação:

- **Email**: suporte@econorte.com.br
- **Documentação**: Ver arquivos de configuração
- **Issues**: Criar issue no repositório

---

## ✅ Checklist de Deploy

- [ ] Configurar Supabase
- [ ] Executar schema SQL
- [ ] Configurar variáveis de ambiente
- [ ] Testar upload de arquivos
- [ ] Testar envio de formulário
- [ ] Verificar responsividade
- [ ] Configurar analytics
- [ ] Testar segurança
- [ ] Backup de dados configurado
- [ ] Monitoramento ativo

**Status**: ✅ Implementação completa e pronta para produção 