# got-character-generator
Projeto para teste de uma solução serveless que inclui API, SQS, DYNAMODB, APIGATEWAY com apiKeys.

A proposta foi criar uma estrutura simples para criação aleatoria e automatizada de personagems do RPG Guerra dos tronos e os conceitos basicos deles.

O processo comeca numa requisicao na api de criacao de personagem que recebe um nome como parametro e retorna um id, essa api insere essa requisicao numa fila de geracao de personagens.

Um lambda processa cada item da fila e salva o personagem criado no dynamoDB.

Esse personagem pode ser acessado atraves da API de leitura.
