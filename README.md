# Event Check-in App 🎟️

Um aplicativo mobile premium desenvolvido com **React Native** e **Expo** para gestão de eventos e check-in via QR Code. O app oferece uma experiência fluida tanto para organizadores quanto para participantes.

## ✨ Funcionalidades

### 🔐 Autenticação e Perfis
- **Fluxo de Login/Cadastro**: Design moderno com animações suaves.
- **Multi-Perfil**: Suporte para visões distintas entre **Organizador** e **Participante**.
- **Persistência de Sessão**: Armazenamento seguro de tokens com `expo-secure-store`.

### 👨‍💼 Visão do Organizador
- **Dashboard de Eventos**: Lista de eventos criados com estatísticas de inscritos.
- **Scanner QR Code**: Validação ultrarrápida de ingressos usando a câmera.
- **Gestão de Participantes**: Busca e visualização de status de presença em tempo real.
- **Relatórios**: Gráficos e métricas de performance do evento.

### 👤 Visão do Participante
- **Explorar Eventos**: Descoberta de novos eventos por categoria.
- **Meus Ingressos**: Central de ingressos com status de check-in.
- **QR Code do Ingresso**: Acesso fácil ao código para validação na entrada.
- **Perfil**: Gestão de dados pessoais e configurações.

### 📶 Diferenciais Técnicos
- **Modo Offline**: Check-ins realizados offline são salvos localmente e sincronizados automaticamente quando houver conexão.
- **Design Premium**: Interface baseada em Dark Mode com Glassmorphism e micro-interações.
- **Performance**: Construído com `Zustand` para estado leve e `Reanimated` para 60fps.

## 🚀 Stack Tecnológica

- **Core**: React Native + Expo (SDK 54)
- **Navegação**: Expo Router (File-based routing)
- **Estado**: Zustand + Middleware de Persistência
- **Estilização**: Vanilla StyleSheet + Paleta de Cores Premium (HSL)
- **Animações**: React Native Reanimated
- **Câmera**: Expo Camera / CameraView
- **Ícones**: Lucide React Native
- **Storage**: Expo SecureStore & AsyncStorage

## 📂 Estrutura de Pastas

```text
├── app/                  # Rotas e telas do Expo Router
│   ├── (auth)/           # Fluxos de login e registro
│   ├── (organizer)/      # Funcionalidades exclusivas do organizador
│   ├── (participant)/    # Funcionalidades exclusivas do participante
│   └── _layout.tsx       # Configuração global de navegação e proteção
├── components/           # Componentes de UI reutilizáveis
│   └── ui/               # Botões, inputs e elementos base
├── store/                # Gerenciamento de estado (Auth, Offline)
├── services/             # Configuração da API (Axios)
├── theme/                # Design System e tokens de cores
└── assets/               # Imagens e recursos estáticos
```

## 🛠️ Como Executar

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**:
   ```bash
   npx expo start
   ```

3. **Abra no seu dispositivo**:
   Use o app **Expo Go** no seu smartphone e escaneie o QR Code gerado no terminal.
---
Desenvolvido com foco em UX e Performance. 🚀