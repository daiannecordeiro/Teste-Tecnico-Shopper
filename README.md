# Teste Técnico Shopper

Este é um teste técnico para a vaga de Desenvolvedor Full Stack Júnior na Shopper, desenvolvido por Daianne Cordeiro (daianne.nc@gmail.com).

## Dependências do Projeto

Certifique-se de ter as seguintes dependências instaladas antes de prosseguir:

1. Docker e Docker Compose
2. Git CLI

## Instruções para a Instalação do Projeto

Siga estas etapas para configurar e executar o projeto:

1.  Clone este repositório para sua máquina local.

    ```shell
    git clone git@github.com:daiannecordeiro/Teste-Tecnico-Shopper.git
    ```

2.  Navegue até a pasta do projeto:
    ```shell
    cd teste-tecnico-shopper
    ```
3.  Execute o comando a seguir para inicializar o projeto:

    ```shell
    yarn project:genesis
    ```

4.  Dentro da pasta /teste-tecnico-api, faça uma cópia do arquivo .env.example e renomeie-o para .env. Em seguida, preencha o arquivo .env com os seguintes dados:

    ```
    APP_DEBUG=true

    NODE_APP_HOST=localhost

    PORT=3333
    NODE_LOCAL_PORT=3001
    NODE_DOCKER_PORT=3000
    HOST=localhost
    MYSQL_LOCAL_PORT=3307
    MYSQL_DATABASE=teste-tecnico-db
    MYSQL_USERNAME=root
    MYSQL_PASSWORD=root
    ```

5.  Agora, você está pronto para iniciar o projeto com:

    ```shell
    yarn project:start
    ```
Isso configurará e executará o projeto com as configurações especificadas. Certifique-se de que todas as dependências sejam atendidas e que o Docker esteja em execução.

Se tiver alguma dúvida ou encontrar problemas durante o processo de instalação, não hesite em entrar em contato com Daianne Cordeiro em daianne.nc@gmail.com ou por meio do linkedin https://www.linkedin.com/in/daiannecordeiro/

