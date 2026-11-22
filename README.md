<h1 align="center">
  <img src="public/mangodisk.svg" width="40" alt="ícone do aplicativo MangoDisk"> MangoDisk
</h1>

<p align="center">Limpeza de disco, análise de armazenamento e proteção de privacidade para <b>macOS</b>, <b>Windows</b> e <b>Linux</b></p>

<a href="https://pixgg.com/ramon"><img src="https://img.shields.io/badge/Pix-pixgg.com%2Framon-32BCAD?style=for-the-badge&logo=pix&logoColor=white" alt="Apoiar o projeto" /></a>

## Índice

- [O que o MangoDisk pode fazer](#o-que-o-mangodisk-pode-fazer)
- [Segurança e regras](#segurança-e-regras)
- [Capturas de tela](#capturas-de-tela)
- [Antes de começar](#antes-de-começar)
- [Aplicativo de desktop](#aplicativo-de-desktop)
- [Linha de comando (CLI)](#linha-de-comando-cli)
- [Compilar a partir do código-fonte](#compilar-a-partir-do-código-fonte)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

<p align="center">
  <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.md">English</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.zh-TW.md">繁體中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.ru.md">Русский</a>
</p>

<p align="center">
  <a href="https://github.com/RamonMods/MangoDisk/releases/latest"><img alt="Latest release" src="https://img.shields.io/github/v/release/RamonMods/MangoDisk?display_name=tag&sort=semver"></a>
  <img alt="macOS supported" src="https://img.shields.io/badge/macOS-supported-111827?logo=apple&logoColor=white">
  <img alt="Windows supported" src="https://img.shields.io/badge/Windows-supported-2563eb?logo=windows&logoColor=white">
  <img alt="Linux supported" src="https://img.shields.io/badge/Linux-supported-f59e0b?logo=linux&logoColor=white">
  <img alt="Tauri 2" src="https://img.shields.io/badge/Tauri-2-24c8db?logo=tauri&logoColor=white">
  <img alt="Rust Core" src="https://img.shields.io/badge/core-Rust-b7410e?logo=rust&logoColor=white">
</p>

<p align="center">
  <a href="https://ramonmods.github.io/MangoDisk/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-00-overview.jpg?ver=2.1.1">
      <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-00-overview.jpg?ver=2.1.1">
      <img src="public/screenshots/pt/light-00-overview.jpg?ver=2.1.1" width="1200" alt="painel de visão geral do MangoDisk">
    </picture>
  </a>
</p>

## O que o MangoDisk pode fazer

> **Armazenamento**

### 1. Limpeza profunda

Recupere o espaço usado por aplicativos do dia a dia, trabalhos de desenvolvimento e ferramentas de IA. Encontre caches, artefatos de build e modelos locais em um só lugar, sem precisar procurar em pastas ocultas:

- **Caches do sistema e do usuário**: recupere o espaço ocupado ao longo do tempo por arquivos temporários do sistema, dados de diagnóstico e caches que podem ser recriados.
- **Caches de aplicativos**: impeça que caches de aplicativos, logs, pacotes de atualização e conteúdos temporários consumam cada vez mais espaço silenciosamente.
- **Dados de navegador**: recupere o espaço usado por dados web em cache e temporários do Chrome, Edge, Firefox, Brave, Arc, Opera e outros navegadores.
- **Ferramentas de desenvolvedor e Xcode**: recupere rapidamente espaço significativo usado por gerenciadores de pacotes, IDEs, caches de compilador e dados de desenvolvimento do Xcode.
- **Caches de contêineres**: libere espaço usado por caches de build inativos e dados recriáveis do Docker e de outras ferramentas de contêiner.
- **Artefatos de build de projetos**: recupere espaço usado por dependências, caches e diretórios de build que podem ser recriados em projetos Node.js, Rust, Gradle, Swift, Python, .NET, Godot, CMake e outros.
- **Ferramentas de IA**: recupere o espaço ocupado por caches, logs antigos e downloads temporários de ferramentas como ChatGPT, Codex e Claude, sem precisar localizar as pastas de dados de cada uma.
- **Modelos de IA**: veja quanto espaço os modelos locais do Ollama, LM Studio, Hugging Face e ComfyUI ocupam e remova os que você não precisa mais para abrir espaço para novos modelos e arquivos do dia a dia. Os modelos são selecionados manualmente e precisam ser baixados novamente se forem necessários depois.
- **Otimização de aplicativos**: reduza o tamanho de aplicativos compatíveis sem afetar o uso normal, deixando mais espaço no disco.

Recomendações inteligentes ajudam você a fazer escolhas seguras rapidamente. Você também pode revisar cada item individualmente e ver antecipadamente o espaço estimado que pode ser recuperado, mantendo cada limpeza previsível e sob seu controle.

### 2. Limpeza de arquivos grandes

Encontre rapidamente os maiores arquivos e recupere o espaço usado por instaladores antigos, vídeos, arquivos compactados e outros conteúdos volumosos sem precisar navegar pasta por pasta.

### 3. Limpeza de arquivos duplicados

Recupere o espaço ocupado por cópias duplicadas sem tratar arquivos como duplicados apenas por terem o mesmo nome. A seleção inteligente mantém pelo menos um arquivo em cada grupo, deixando a limpeza simples e segura.

### 4. Análise de espaço em disco

#### Distribuição de espaço

Veja para onde vai o espaço do seu disco de relance. Alterne entre um **treemap** (mapa de árvore) e um **sunburst chart** (gráfico de raios solares), e escolha quantos níveis exibir para explorar o uso de espaço e a estrutura de pastas. Navegue pelas pastas junto à lista de arquivos para encontrar rapidamente as maiores pastas e arquivos e decidir o que limpar.

#### Alterações de espaço

O espaço do disco acabou de repente? Ative o histórico de varredura e compare duas varreduras da mesma unidade ou pasta para ver quais arquivos e pastas cresceram ou diminuíram, e quanto. Faça outra varredura após a limpeza para ver onde você liberou espaço.

> **Privacidade e segurança**

### 5. Limpeza de privacidade

Evite que histórico de navegação, pesquisas, cookies, itens recentes e dados da área de transferência permaneçam no seu computador. Limpe os rastros deixados por navegadores, aplicativos e pelo sistema para reduzir a exposição da sua atividade e facilitar a gestão da privacidade no dia a dia.

> **Ferramentas do sistema**

### 6. Desinstalação e limpeza de aplicativos

Desinstale aplicativos e limpe caches, configurações e resíduos relacionados para que remover um aplicativo realmente devolva o espaço. Possíveis arquivos pessoais são tratados com cautela para reduzir o risco de exclusão acidental.

### 7. Gerenciamento de itens de inicialização

Reduza atrasos desnecessários na inicialização e o uso de recursos em segundo plano, para que seu computador inicie mais rápido e pareça mais leve. Reative os itens a qualquer momento quando precisar deles novamente.

### 8. Otimização do sistema

Reduza configurações desnecessárias que deixam o sistema lento ou atrapalham. Equilibre desempenho, privacidade e preferências pessoais para que seu computador pareça mais rápido e mais fácil de usar.

### 9. Manutenção do sistema

Corrija problemas comuns como resultados de pesquisa ausentes, ícones incorretos, sem som ou falhas de conexão de rede — sem precisar procurar soluções ou digitar comandos complexos. Volte a ter seu computador funcionando normalmente mais rápido.

### 10. Menus de contexto (Windows)

> Disponível desde a versão 1.2.3

Mantenha os menus de clique direito organizados e fáceis de usar. Navegue pelas entradas por local do menu ou aplicativo, desative, restaure ou remova itens compatíveis e ajuste os menus para tipos de arquivo específicos.

Adicione ações do dia a dia, como copiar caminhos e abrir um terminal, além de atalhos para ferramentas do sistema.

> **Atividade**

### 11. Histórico de operações

Mantenha um registro claro de cada limpeza e alteração no sistema. Veja quanto espaço você recuperou, o que foi concluído com sucesso e se algo ainda precisa da sua atenção.

## Uso de recursos e gerenciamento de memória

> Disponível desde a versão 1.1.1

Acompanhe CPU, GPU, memória, velocidades de rede e atividade do disco em tempo real, com tendências para ajudar você a entender o uso de recursos. Em dispositivos compatíveis, você também pode verificar temperaturas, consumo de energia, estado da bateria e saúde do disco.

Encontre rapidamente aplicativos que consomem muitos recursos, encerre os que você não precisa mais e libere memória manual ou automaticamente.

Exiba métricas na barra de menus, na barra de tarefas, na bandeja do sistema ou em uma janela flutuante na área de trabalho. Personalize o conteúdo e a aparência para acompanhar seu computador sem abrir a janela principal.

## Explicações de IA

> Disponível desde a versão 1.1.0

Não tem certeza do que um item faz ou do que pode acontecer se você alterá-lo? As explicações de IA usam a descrição do item e os resultados da varredura atual para explicar sua função e o que considerar antes de agir. Passe menos tempo pesquisando e tome decisões mais bem informadas.

Obtenha explicações diretamente dos itens em Limpeza profunda (regras integradas), Limpeza de privacidade, Gerenciamento de itens de inicialização, Otimização do sistema e Manutenção do sistema.

As versões oficiais incluem explicações gratuitas a cada dia, com a opção de conectar seu próprio serviço de IA. A IA oferece orientações; você decide quais ações tomar.

## Segurança e regras

> [!IMPORTANT]
> **O MangoDisk prioriza a segurança dos dados em vez de recuperar mais espaço.**
> Regras de limpeza e otimizações do sistema só são lançadas depois que seus limites de segurança são claramente definidos e passam por validação em sistemas reais.

O MangoDisk faz varreduras em modo somente leitura por padrão. Antes de iniciar limpeza, exclusão, desinstalação ou alterações de configuração do sistema, você pode revisar e confirmar exatamente o que acontecerá. Os resultados são salvos no Histórico de operações.

A Otimização do sistema usa apenas configurações integradas e validadas. Nunca aceita caminhos de registro arbitrários, comandos de terminal ou scripts. O MangoDisk lê cada configuração novamente após alterá-la e destaca itens de alto impacto e mudanças que exigem acesso de administrador ou reinicialização.

O MangoDisk mantém suas próprias regras de limpeza. Projetos de terceiros podem fornecer pistas para pesquisa, mas uma regra candidata só é aceita após a verificação de fontes confiáveis, limites seguros e comportamento em sistemas reais. Qualquer coisa sem um limite de segurança claro é excluída.

A biblioteca completa de regras e o histórico de revisões estão abertos para inspeção: [veja a biblioteca de regras de limpeza do MangoDisk](https://github.com/RamonMods/MangoDisk/tree/main/src-tauri/crates/mangodisk-core/rules).

## Capturas de tela

<p align="center">
  <strong>Limpeza profunda</strong><br>
  <sub>Abra espaço para o que importa limpando caches acumulados, artefatos de build e modelos de IA que você não precisa mais</sub>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-01-deep-cleanup.jpg?ver=2.1.1">
    <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-01-deep-cleanup.jpg?ver=2.1.1">
    <img src="public/screenshots/pt/light-01-deep-cleanup.jpg?ver=2.1.1" width="1200" alt="interface de Limpeza profunda do MangoDisk">
  </picture>
</p>

<p align="center">
  <strong>Distribuição de espaço</strong><br>
  <sub>Veja para onde vai seu armazenamento e encontre rapidamente os maiores arquivos e pastas</sub>
</p>

<p align="center">
  <a href="public/screenshots/pt/light-05-disk-space-analysis.jpg?ver=2.1.1" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-05-disk-space-analysis.jpg?ver=2.1.1">
      <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-05-disk-space-analysis.jpg?ver=2.1.1">
      <img src="public/screenshots/pt/light-05-disk-space-analysis.jpg?ver=2.1.1" width="1200" alt="interface de Análise de espaço em disco do MangoDisk">
    </picture>
  </a>
</p>

<p align="center">
  <strong>Alterações de espaço</strong><br>
  <sub>Compare duas varreduras para ver quais arquivos e pastas ocupam mais ou menos espaço</sub>
</p>

<p align="center">
  <a href="public/screenshots/pt/light-05-disk-space-analysis-space-changes.jpg?ver=2.1.1" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-05-disk-space-analysis-space-changes.jpg?ver=2.1.1">
      <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-05-disk-space-analysis-space-changes.jpg?ver=2.1.1">
      <img src="public/screenshots/pt/light-05-disk-space-analysis-space-changes.jpg?ver=2.1.1" width="1200" alt="visualização de Alterações de espaço do MangoDisk comparando duas varreduras">
    </picture>
  </a>
</p>

<p align="center">
  <strong>Monitoramento do sistema</strong><br>
  <sub>CPU, memória, rede e atividade do disco de relance</sub>
</p>

<p align="center">
  <a href="public/screenshots/pt/light-system-monitoring-memory.jpg?ver=2.1.1" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-system-monitoring-memory.jpg?ver=2.1.1">
      <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-system-monitoring-memory.jpg?ver=2.1.1">
      <img src="public/screenshots/pt/light-system-monitoring-memory.jpg?ver=2.1.1" width="720" alt="monitoramento do sistema e gerenciamento de memória do MangoDisk">
    </picture>
  </a>
</p>

<table>
  <tr>
    <td width="50%" align="center">
      <strong>Limpeza de arquivos grandes</strong><br>
      <sub>Encontre os arquivos que ocupam mais espaço sem precisar navegar pelas pastas</sub><br><br>
      <a href="public/screenshots/pt/light-02-large-file-cleanup.jpg?ver=2.1.1" target="_blank" rel="noopener noreferrer">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-02-large-file-cleanup.jpg?ver=2.1.1">
          <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-02-large-file-cleanup.jpg?ver=2.1.1">
          <img src="public/screenshots/pt/light-02-large-file-cleanup.jpg?ver=2.1.1" width="100%" alt="interface de Limpeza de arquivos grandes do MangoDisk">
        </picture>
      </a>
    </td>
    <td width="50%" align="center">
      <strong>Limpeza de arquivos duplicados</strong><br>
      <sub>Remova duplicatas exatas com segurança, mantendo pelo menos uma cópia</sub><br><br>
      <a href="public/screenshots/pt/light-03-duplicate-cleanup.jpg?ver=2.1.1" target="_blank" rel="noopener noreferrer">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-03-duplicate-cleanup.jpg?ver=2.1.1">
          <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-03-duplicate-cleanup.jpg?ver=2.1.1">
          <img src="public/screenshots/pt/light-03-duplicate-cleanup.jpg?ver=2.1.1" width="100%" alt="interface de Limpeza de arquivos duplicados do MangoDisk">
        </picture>
      </a>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <strong>Gerenciamento de itens de inicialização</strong><br>
      <sub>Reduza programas desnecessários na inicialização para entrar mais rápido e ter menos atividade em segundo plano</sub><br><br>
      <a href="public/screenshots/pt/light-06-startup-items.jpg?ver=2.1.1" target="_blank" rel="noopener noreferrer">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-06-startup-items.jpg?ver=2.1.1">
          <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-06-startup-items.jpg?ver=2.1.1">
          <img src="public/screenshots/pt/light-06-startup-items.jpg?ver=2.1.1" width="100%" alt="interface de Gerenciamento de itens de inicialização do MangoDisk">
        </picture>
      </a>
    </td>
    <td width="50%" align="center">
      <strong>Desinstalação e limpeza de aplicativos</strong><br>
      <sub>Desinstale aplicativos e remova resíduos relacionados para recuperar mais espaço</sub><br><br>
      <a href="public/screenshots/pt/light-04-app-uninstaller.jpg?ver=2.1.1" target="_blank" rel="noopener noreferrer">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-04-app-uninstaller.jpg?ver=2.1.1">
          <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-04-app-uninstaller.jpg?ver=2.1.1">
          <img src="public/screenshots/pt/light-04-app-uninstaller.jpg?ver=2.1.1" width="100%" alt="interface de desinstalação de aplicativos do MangoDisk">
        </picture>
      </a>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <strong>Otimização do sistema</strong><br>
      <sub>Otimize desempenho, privacidade e usabilidade do dia a dia com um clique</sub><br><br>
      <a href="public/screenshots/pt/light-07-system-optimization.jpg?ver=2.1.1" target="_blank" rel="noopener noreferrer">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-07-system-optimization.jpg?ver=2.1.1">
          <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-07-system-optimization.jpg?ver=2.1.1">
          <img src="public/screenshots/pt/light-07-system-optimization.jpg?ver=2.1.1" width="100%" alt="interface de Otimização do sistema do MangoDisk">
        </picture>
      </a>
    </td>
    <td width="50%" align="center">
      <strong>Manutenção do sistema</strong><br>
      <sub>Corrija problemas comuns do sistema rapidamente e deixe seu computador normal novamente</sub><br><br>
      <a href="public/screenshots/pt/light-08-system-maintenance.jpg?ver=2.1.1" target="_blank" rel="noopener noreferrer">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-08-system-maintenance.jpg?ver=2.1.1">
          <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-08-system-maintenance.jpg?ver=2.1.1">
          <img src="public/screenshots/pt/light-08-system-maintenance.jpg?ver=2.1.1" width="100%" alt="interface de Manutenção do sistema do MangoDisk">
        </picture>
      </a>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <strong>Limpeza de privacidade</strong><br>
      <sub>Deixe menos rastros de atividade e mantenha o uso do dia a dia mais privado</sub><br><br>
      <a href="public/screenshots/pt/light-09-privacy-cleanup.jpg?ver=2.1.1" target="_blank" rel="noopener noreferrer">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/screenshots/pt/dark-09-privacy-cleanup.jpg?ver=2.1.1">
          <source media="(prefers-color-scheme: light)" srcset="public/screenshots/pt/light-09-privacy-cleanup.jpg?ver=2.1.1">
          <img src="public/screenshots/pt/light-09-privacy-cleanup.jpg?ver=2.1.1" width="100%" alt="interface de Limpeza de privacidade do MangoDisk">
        </picture>
      </a>
    </td>
  </tr>
</table>

## Antes de começar

> [!CAUTION]
>
> 1. Limpeza, exclusão permanente e desinstalação podem não ser reversíveis. Revise o conteúdo selecionado e mantenha backups confiáveis de dados importantes.
> 2. Antes de executar a manutenção do sistema ou alterar um item de inicialização ou configuração do sistema, certifique-se de entender sua finalidade e impacto.
> 3. Algumas otimizações do sistema podem afetar segurança, privacidade, duração da bateria ou comportamento de atualizações.

## Aplicativo de desktop

Baixe o MangoDisk na [página oficial de download](https://ramonmods.github.io/MangoDisk/download) ou nas [versões do GitHub](https://github.com/RamonMods/MangoDisk/releases/latest), e siga as instruções para seu sistema operacional abaixo.

### macOS

**Requisitos:** macOS Monterey 12.5 ou superior.

**Instalar com Homebrew:**

```sh
brew install --cask RamonMods/tap/mangodisk
```

**Instalação manual:** baixe o DMG na [página oficial de download](https://ramonmods.github.io/MangoDisk/download), abra-o e arraste o MangoDisk para a pasta Applications.

### Windows

**Requisitos:** Windows 10 de 64 bits ou superior.

**Instalar com PowerShell:**

```powershell
winget install --id MangoDisk.MangoDisk --exact --source winget
```

**Instalar com WinGet (fonte oficial):**

```powershell
winget install --id MangoDisk.MangoDisk --exact --source winget
```

**Instalação manual:** baixe o instalador para Windows na [página oficial de download](https://ramonmods.github.io/MangoDisk/download) e siga as instruções de instalação.

### Linux

**Recomendado:** Ubuntu 22.04 LTS ou superior, em x64 ou ARM64.

Disponível como pacotes `.deb` e AppImages. A compatibilidade com outras distribuições Linux depende das bibliotecas do sistema e do ambiente de desktop.

**Instalar com Homebrew:** exige uma versão recente do Homebrew e um ambiente de desktop.

```sh
brew install --cask RamonMods/tap/mangodisk
```

**Instalar pelo terminal (Debian/Ubuntu):** este comando detecta sua arquitetura e instala o pacote `.deb` mais recente compatível.

```sh
curl -fsSL https://github.com/RamonMods/MangoDisk/releases/latest | bash
```

**Instalação manual:** escolha o pacote para sua arquitetura na [página oficial de download](https://ramonmods.github.io/MangoDisk/download).

- **Debian/Ubuntu:** instale o pacote `.deb` para sua arquitetura.
- **Outras distribuições:** experimente o AppImage tornando-o executável e depois executando-o.

## Linha de comando (CLI)

Use o MangoDisk no terminal ou em scripts, com o mesmo mecanismo de limpeza que prioriza a segurança do aplicativo de desktop.

### macOS

**Instalar com Homebrew:**

```sh
brew install RamonMods/tap/mangodisk-cli
```

### Windows

**Instalar com PowerShell:**

```powershell
winget install --id MangoDisk.MangoDisk --exact --source winget
```

**Instalar com WinGet (fonte oficial):**

```powershell
winget install --id MangoDisk.CLI --exact --source winget
```

### Linux

Ainda não há downloads de CLI autônomos pré-compilados para Linux. Siga as instruções de [compilar a partir do código-fonte](#build-from-source) abaixo para compilar você mesmo.

### Exemplos de uso

Se `mangodisk` não estiver disponível imediatamente após a instalação, abra um novo terminal e verifique a instalação:

```sh
mangodisk --version
```

Comandos comuns:

```sh
# Scan and show cleanable content without changing anything
mangodisk clean

# Apply the same smart recommendations as the desktop application
mangodisk clean --apply

# Preview all selectable content without deleting anything
mangodisk clean --apply --selection all --dry-run

# Produce machine-readable JSON output
mangodisk clean --format json --no-progress
```

`mangodisk clean` apenas faz varredura e nunca modifica arquivos por padrão. Para realizar a limpeza em um ambiente não interativo, você também precisa passar `--yes` para confirmar explicitamente. Execute o comando a seguir para ver todas as opções disponíveis:

```sh
mangodisk clean --help
```

<a id="build-from-source"></a>

## Compilar a partir do código-fonte

### Pré-requisitos

- Node.js 24 LTS
- pnpm 11.13.1
- Rust estável

Para dependências específicas de cada plataforma, veja os [pré-requisitos do Tauri 2](https://v2.tauri.app/start/prerequisites/).

### Obtenha o código-fonte e execute o aplicativo de desktop

```sh
git clone https://github.com/RamonMods/MangoDisk.git
cd MangoDisk
pnpm install --frozen-lockfile
pnpm tauri:dev
```

### Execute as verificações necessárias

```sh
pnpm check
cargo test --manifest-path src-tauri/Cargo.toml -p mangodisk-core
```

### Compile o instalador do aplicativo de desktop

```sh
pnpm tauri:build
```

### Compile a CLI

```sh
pnpm cli:build
```

Compilações locais não incluem assinatura, notarização ou metadados de atualização fornecidos pelas versões oficiais do MangoDisk. Use-as apenas para desenvolvimento e validação local.

## Contribuindo

Issues, regras de limpeza, correções e novos recursos são bem-vindos. Leia [`CONTRIBUTING.md`](CONTRIBUTING.md) e [`AGENTS.md`](AGENTS.md) antes de começar.

A cobertura rotineira de limpeza deve usar regras TOML declarativas validadas na compilação. Veja [`src-tauri/crates/mangodisk-core/rules/README.md`](src-tauri/crates/mangodisk-core/rules/README.md) para o esquema de regras, restrições de segurança e instruções de validação.

Antes de enviar alterações, execute pelo menos:

```sh
pnpm check
cargo test --manifest-path src-tauri/Cargo.toml -p mangodisk-core
```

Relate vulnerabilidades de segurança de forma privada por meio do GitHub Security Advisories, conforme descrito em [`SECURITY.md`](SECURITY.md). Não abra uma issue pública para uma vulnerabilidade de segurança.

## Stack tecnológica

- [Tauri 2](https://tauri.app/): runtime de desktop e integração com o sistema
- [Rust](https://www.rust-lang.org/): varredura, acesso ao sistema de arquivos, validação de segurança e execução da limpeza
- [Vue 3](https://vuejs.org/) e [TypeScript](https://www.typescriptlang.org/): interface de usuário do aplicativo de desktop

## Licença

O MangoDisk é de código aberto sob a [GNU General Public License v3.0](https://github.com/RamonMods/MangoDisk/blob/main/LICENSE). Componentes de terceiros continuam sujeitos às suas respectivas licenças.
