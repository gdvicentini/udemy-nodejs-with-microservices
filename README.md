Conceitos NestJS

> Anotações de estudo feitos durante o desenvolvimento do curso.

NestJS Modules:
    • Cada aplicação tem pelo menos um module - o root module. É o ponto inicial (starting point) da aplicação;
    • Módulos são uma maneira efetiva para organizarmos componentes com capacidades relacionadas (por features, por exemplo);
    • É uma boa prática ter um diretório por module, contendo seus componentes;
    • Modules são singletons, portanto um module pode ser importado por outros módulos;
    • Um module é definido quando anotamos uma classe com o decorator @Module. Um decorator fornece metadados que o Nest utiliza para organizar a estrutura da aplicação;
    • Propriedades do decorator @Module :
        - Providers: Array de providers que devem estar disponíveis dentro do módulo via injeção de dependência;
        - Controllers: Array de controllers que devem ser instanciados dentro do module;
        - Exports: Array de providers que devem ser exportados para outros modules;
        - Imports: Lista de modules necessários para este modulo.


NestJS Controllers:
    • Responsável por lidar com as requisições HTTP recebidas e retornar responses para o cliente;
    • Encaminha as requisiçães para um path específico; 
        - Exemplo: "/jogadores" para o resource jogadores
    • Possui handlers, que lidam diretamente com métodos HTTP, tais como: GET, POST, DELETE, etc.);
        - Handlers são métodos implementados dentro classe controller, que são anotados com os decorators @Get, @Post, @Delete, etc.
    • Podem tirar vantagem da injeção de dependência para consumir providers presentes em um mesmo modulo;
    • São definidos quando anotamos uma classe com o decorator @Controller;
    • O decorator aceita uma string, que é o path a ser controlado pelo controller;


NestJS Providers e Services:
  * Providers:
    • A ideia principal de um provedor, é que ele pode ser injetado como uma dependência;
    • Pode ser injetado dentro de construtores, se decorado com a anotação @Injectable, via injeção de dependência;
    • Pode ser uma classe, sync/async factory, etc;
    • Providers devem ser fornecidos por um módulo para que se tornem utilizáveis;
    • Podem ser exportados por um módulo, se tornando disponíveis para um outro módulo importa-los;
    • Os objetos podem criar vários relacionamentos uns com os outros através da injeção de dependência, e a função de "ligar" instâncias de objetos pode ser amplamente delegada ao sistema de tempo de execução;

  * Services:
    • São definidos como providers, porém, nem todo provider é um service;
    • Trata-se de um conceito comum no contexto de desenvolvimento de software e não são exclusivos do NestJS, JavaScript ou desenvolvimento backend;
    • São singleton quando empacotados com @Injectable() e fornecidos a um module. Ou seja, uma mesma instância será compartilhada em toda a aplicação;
    • É a principal fonte de lógica de negócios.

  * Para mais detalhes sobre providers e services, acesse a documentação do Nest: [https://docs.nestjs.com/providers]


NestJS Pipes:
    • Atuam nos argumentos que serão processados pelo route handler, pouco antes do handler ser chamado;
    • Pipes podem executar duas funções principais: transformação de dados ou validação de dados;
    • Pipes podem lançar exceções, onde essas exceções lançadas serão manipuladas pelo NestJS e retornadas em um error response;
    • NestJS disponibiliza pipes muito úteis dentro do @nestjs/common module;
    • Built-in pipes:
        Nest vem com 5 pipes disponíveis pronta para uso:
        - ValidationPipe;
        - ParseintPipe;
        - ParseBoolPipe;
        - ParsearrayPipe;
        - ParseUUIDPipe;
        - DefaultValuePipe;
    • É possível implementar um Custom Pipe através de pipes existentes na biblioteca


Microservices - Entendimentos Iniciais:
    • Arquitetura orientada à eventos;
    • O objetivo de utilização desse modelo arquitetural é:
        - Facilitar a implementação de novas features, uma vez que teremos domínios de negócio exclusivos em cada microsserviço;
        - Autonomia para nossos componentes de modo que possamos desenvolver e publicar serviços de forma independente;
        - Aumentar a capacidade de escalabilidade horizontal e balanceamento de carga;
        - Maior resiliência / Tolerância a falhas;
    • Microsserviços necessitam que cada cenário deva ser avaliado com cautela.
    • Ao adotar este modelo, no mínimo, você deve se preocupar com:
        - Agilidade em seu processo de provisionamento e deployment (CI/CD);
        - Monitoramento robusto;
        - Abraçar a cultura devOps;
        - Testes de resiliência e injeção de falhas passam a ser essenciais na sua vida;


NestJS Package Microservices:
    • Sistema integrado do Nest;
    • Utiliza camada diferente de transporte, que não é o HTTP, para viabilizar a comunicação entre aplicações através da rede;
    • Seu core é chamado de TRANSPORTERS;
    • TRANSPORTERS:
        - Responsáveis por transmitir as mensagens entre diferentes instancias de microservices;
        - A maioria desses transporters suportam nativamente os estilos de mensagem: request-response e event-based;
        - O Nest abstrai os detalhes de implementação de cada transporter atrás de uma interface canônica;
        - Temos dois tipos de Nest Transporters:
            > Broker-based: Redis, NATS, RabbitMQ, MQTT e Kafka;
            > Point-to-point: TCP e gRPC;
    • Broker-based:
        - Nos permitem desacoplar vários componentes da aplicação;
        - Cada componente somente precisa se conectar ao broker;
        - Pode permanecer sem necessidade de conhecer a existência, localização ou detalhes da implementação de outros componentes;
        - A única coisa que precisa ser compartilhada entre os componentes é o protocolo de mensagens;
        - Um broker se divide em:
            > Broker server: processo do lado do servidor, responsável por gerenciar a publicação, assinatura e entrega das mensagens aos clientes;
            > Broker client API: é disponibilizado em um package específico para cada linguagem (Javascript, Java, Go etc), fornecendo uma API para acessar o broker, a partir de aplicações clientes;
    • Estilo do modelo PUBLISH/SUBSCRIBE: chamaremos de event os tipos de mensagens que podemos trocar com base nesse modelo.
        - Event emitter: 
            > Componente que publica uma mensagem com um tópico;
            > Trata-se de um message publisher;
        - Event subscriber:
            > Componente que registra o interesse em um tópico e recebe as mensagens (encaminhadas pelo broker) quando esta mensagem corresponde a um tópico publicado;
    • Estilo do modelo REQUEST/RESPONSE: chamaremos de request/response os tipos de mensagens que podemos trocar com base nesse modelo.
        - Requestor:
            > Componente que publica uma mensagem que pretende ser tratada como uma request e também executa as etapas descritas anteriormente;
            > Se inscreve em um response topic e inclui este response topic na mensagem publicada;
        - Responder:
            > Componente que se inscreve em um topic, que pretende tratar como uma incoming request, produz um resultado e publica um response (incluindo o payload recuperado) para o response topic que recebeu na inbound request;


NestJS Interceptors:
    • Os interceptors nos entregam um conjunto de recursos capazes de:
        - Adicionar lógica antes e depois da execução de nossos métodos;
        - Transformar o resultado de uma função;
        - Transformar uma exception lançada por uma função;
        - Ampliar o comportamento de uma função;
        - Dependendo de condições específicas, sobrescrever completamente uma função (exemplo: fins de cache);
    • Características de implementação:
        - Um interceptor deve implementar a interface NestInterceptor e deverá sobrescrever o método intercept(), onde teremos acesso dois argumentos:
            > Instância de ExecutionContext que herda de ArgumentsHost. Nós já interagimos com este objeto, quando implementamos nosso Tratamento global de exceção, onde exploramos os recursos de "Execution Context" que o Nest nos entrega.
            > Um CallHandler. Esta é uma interface que implementa o método handle(), que podemos utilizar para acionar um route handle method em algum ponto do nosso interceptor. Se não, invocarmos o método handle(), em nossa implementação do método intercept(), nosso route handle method não será executado. É importante ressaltar que este método handle() retorna um observable, onde podemos utilizar o poder dos operadores RxJs para manipular o response, interagindo antes ou depois da execução do nosso route handle method.


Protegendo os endpoints de nossa API:
    • objetivo exemplo: exigir dos clientes a Autorização para a cessar os endpoints/resources da API;
    • O acesso somente será concedido mediante entrega de um Token válido, emitido, por exemplo, pelo Cognito da Amazon após processo de autenticação;
    • Para realizar a validação, é necessário a ajuda de uma biblioteca externa, como a Passport;
    • Após a instalação, podemos acioná-la através do módulo @nestjs/passport;


NestJS Guards:
    • Para ativar uma validação baseada no uso do Token em nossos endpoints, contaremos com a ajuda dos Guards;
    • Um Guard é uma classe anotada com o decorator Injectable(), que devemos implementar a interface CanActivate;
    •  Guards são executados depois de cada middleware, mas antes de qualquer interceptor ou pipe;
    •  Guards possuem uma responsabilidade muito simples. Eles determinam se uma requisição será tratada ou não pelo route handler, dependendo de determinadas condições (permissões, roles, etc) presentes em tempo de execução.
    •  Este contexto é conhecido como Autorização, que normalmente caminha junto com seu primo Autenticação. Autorização e Autenticação normalmente são tratados por um middleware em aplicações Express tradicionais.
    •  Um middleware pode ser uma boa escolha para suportar o processo de Autenticação, uma vez que atividades como validação de token ou anexar propriedades ao objeto request não estão diretamente conectadas a um contexto particular da rota.
    •  Porém o middleware, por si só, não consegue identificar qual handler deverá ser executado após a chamada da função next().
    •  Por outro lado, Guards possuem acesso a instancia de ExecutionContext, e deste modo, sabem exatamente o que será executado a seguir. Eles sã projetados como Exception Filters, Pipes e Interceptors, ou seja, nos permitem introduzir lógica de processamento exatamente em um ponto específico do ciclo request/response.


Cloud Foundry:
    •  É uma "Open Source Cloud Application Plataform" que torna mais rápido e fácil realizar o build, testar, publicas e escalar aplicações;
    •  Possui uma arquitetura baseada em container que é capaz de executar aplicações em qualquer linguagem;
    •  Ao desacoplar aplicações da infraestrutura, podemos decidir onde iremos hospedar nossos workload (On-premise, Clouds Públicas, Infraestruturas Gerenciadas), e mover estas workloads em minutos, sem a necessiadde de alterações na aplicação;
    •  Altamente adaptavel e resistirá a mudanças na tecnologia para que possamos adotar novas ferramentas, linguagens ou plataformas no futuro;
    •  Projeto de código aberto com uma contribuição aberta e um modelo de governança que fornece máxima flexibilidade evitando lock-in com um determinado provedor/fornecedor de serviço;