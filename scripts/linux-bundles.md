# Compatibilidade de bundles Linux

Compile com `pnpm tauri:build:linux` no Ubuntu 22.04 para cada arquitetura Linux
suportada. Mantenha a linha de base do glibc 2.35; mover a compilação para uma
versão mais recente do Ubuntu pode impedir que os bundles rodem em sistemas
suportados mais antigos.

A compilação exclui `libwayland-*.so*` por meio de `LINUXDEPLOY_EXCLUDED_LIBRARIES`
para que o Mesa use as bibliotecas Wayland correspondentes do host. O Tauri CLI 2.12.1
também fornece o linuxdeploy e o plugin GTK atualizados. O AppRun do projeto delega
ao launcher do Tauri e usa `usr/lib/gio/modules`, o layout atual do plugin GTK, para
isolar o GLib empacotado dos módulos GIO mais recentes do host.

`scripts/test-linux-bundle.py` exercita a rejeição de bibliotecas e o comportamento
do launcher antes do empacotamento. `scripts/check-linux-bundle.py` inspeciona o DEB e
o AppImage finais quanto à arquitetura, requisitos de glibc, permissões e conteúdo do
launcher, ao módulo e cache de TLS do GIO, e a quaisquer bibliotecas ou symlinks
Wayland remanescentes. Ambas as verificações são executadas pelo script de compilação.

Valide o AppImage resultante no Ubuntu 22.04 e em um sistema Mesa/Wayland mais recente.
Confirme que a interface é renderizada, que os processos do WebKit permanecem ativos e
que o HTTPS funciona. Apenas compilar e verificar as dependências ELF não valida esses
caminhos em tempo de execução.
