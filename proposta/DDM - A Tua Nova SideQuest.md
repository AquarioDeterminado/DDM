
| [Github]()                                                                                                                | *Ainda não criado* |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [ClickUp](https://app.clickup.com/9015003806/v/li/901503208759)                                                           | Plano de Produção  |
| [Figma](https://www.figma.com/file/fiCkJb43Y9a2b9YUNEoBcE/DDM?type=design&node-id=0%3A1&mode=design&t=WMF7BiIMrPJtihZN-1) | Guiões de Teste    |
### Alunos:
| Nome         | nº       |
| ------------ | -------- |
| João Coelho  | 20220753 |
| Ricardo Dias | 20220494 |
### Descrição: 
 - DDM é um jogo *multiplayer* onde utilizadores batalham entre si num jogo de cartas. O jogo é simples e rápido, sendo direcionado a utilizadores *multitaskers* que preferem fazer as suas tarefas com algum entretenimento a ajudar. Como tal, o jogo oferece um alivio dá tarefa principal dos mesmos, sem "roubar" por completo a sua atenção e impedir que a tarefa não seja concluída. 
 - Inspirando-nos no método "pomodoro", o jogador pode-se movimentar num mapa (real ou imaginário, ainda por decidir), esta locomoção demorara tempo real. Desta forma recompensamos o jogador de acordo com o tempo de atenção que o mesmo dedicou a sua tarefa principal.
 - Como tema do jogo, decidimos que o jogador é um **Passeador de Cães** e as suas cartas são os cães que passeia. Como tal, andar pelo mapa é igual a "fazer um passeio com os cães". 
---
### Problema:
 - Com a evolução das redes sociais, estas tornaram-se num vício de Dopamina que resultam em tempos de atenção mais reduzidos. Para combater este fenómeno nós propomos de certa forma uma maneira de reverter esses efeitos por meios intermédios. No mercado atual, apesar de já existirem jogos que permitam fazê-lo por conta própria, são raros os casos que se focam especificamente em ajudar a pessoa a progredir para uma vida menos presa aos seus dispositivos. Com o nosso jogo DDM, o nosso público alvo são pessoas com dificuldades de retenção de atenção que para além de estudarem ou trabalharem, precisam de um estimulante adicional de maneira a conseguirem reter a sua atenção durante maiores períodos de tempo.
### Solução 
 - Pesquisando outros no jogos utilizados para fins semelhantes apesar de diferentes, no mercado descobrimos um padrão que como no Subway Surfers e no RimWorld, utilizam mecânicas como gráficos coloridos e animados, controlos simples e intuitivos ou maneiras de parar o jogo e personagens carismáticas para cativar o seu publico alvo, bem como a possibilidade de liberdade para que o jogador nao se sinta pressionado a ter de fazer algo podendo simplesmente deambular pelo mapa. Sendo assim tentamos integrar estas características no nosso jogo bem como a utilização de uma maneira de jogar que permite ao jogador pausar o jogo para recomeçar a trabalhar nos seus diferentes projetos.
---
### Características:

#### Índice de *Features*
- LoIng / SignUp *:
	- Verificação de Email
	- *Password Salting*
	- *Reset* de Palavra-Passe
	
- Tutorial / Manual de Jogo
- *Card Figthing* (!)
- Criação de Baralho

- Exploração do Mapa (!)
- Encontros Aleatorios  (?)
- Tarefas (?)

- Lista de Amigos
- Perfil
- Definições

(!) -  *Features* Principais 
(?) - *Features* em Dicussão

---
### Enquadramento com as Cadeiras de Semestre:
Estatística - Estatísticas de Jogo (nº de vitorias ganhas, probabilidades, etc.)
Sistemas de Informação Geográficos - Deslocação pelo Mapa
Algoritmos e Estrutura de Dados - Algoritmo de Procura de Jogadores (Lista de Amigos)

### Arquitetura:
API: Node.js 
Web App: React
Base de Dados: Postgres (PostGIS)