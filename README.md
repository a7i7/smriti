# Smriti

Smriti is an approach to help you transform your 12 or 24 word seed phrases into memorizable ones.

There are 2048 words within the [BIP-39 wordlist](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt).

This gives an entropy of $`\\2048^{12}=2^{132}`$ and $`\\2048^{24}=2^{264}`$ for the 12 and 24 word seed phrase respectively.

### Memorization

While it is difficult for someone to memorize a list of 12 / 24 random words in order,<br> it is relatively easy for someone to memorize a number of different classes of things.

e.g.

Remember a Movie : Les Miserables

Remember a Fruit : Kiwi

Remember a Bird : Humming bird

Remember a song : The Amen Corner

and so on

The list of such classes (Movie, Fruit, Bird etc.) are ordered which reduces a <br> burden of the end user.

They only need to remember the names of objects from each class <br> but has no need to maintain the order in their head.

### Construction

So the math works out to

$`\\{N(c_{1})}*{N(c_{2})}*{N(c_{3})}*...*{N(c_{m})}=2^{132}`$

$`\\{N(c_{1})}*{N(c_{2})}*{N(c_{3})}*...*{N(c_{m})}=2^{264}`$

for the 12 and 24 word seed phrase respectively

where we have <b>m</b> different classes of things to memorize, with

$`\\{N(c_{i})}`$ is the number objects in class i

If we assume each class to have the same number of objects, <br>

$`\\{N(c_{1})}={N(c_{2})}={N(c_{3})}=...={N(c_{m})}`$

this table lists how many different classes we will need

| Number of classes (m) | $`\\N(c_{m})`$ for 12 word seed phrase | $`\\N(c_{m})`$ for 24 word seed phrase |
| --------------------- | :------------------------------------: | -------------------------------------: |
| 10                    |                  9411                  |                               88550677 |
| 11                    |                  4097                  |                               16777217 |
| 12                    |                  2048                  |                                4194304 |
| 13                    |                  1140                  |                                1297851 |
| 14                    |                  690                   |                                 474861 |
| 15                    |                  446                   |                                 198669 |
| 16                    |                  305                   |                                  92682 |
| 17                    |                  218                   |                                  47296 |
| 18                    |                  162                   |                                  26008 |
| 19                    |                  124                   |                                  15232 |
| 20                    |                   98                   |                                   9411 |
| 21                    |                   79                   |                                   6087 |
| 22                    |                   65                   |                                   4097 |
| 23                    |                   54                   |                                   2853 |
| 24                    |                   46                   |                                   2048 |
| 25                    |                   39                   |                                   1510 |
| 26                    |                   34                   |                                   1140 |
| 27                    |                   30                   |                                    878 |
| 28                    |                   27                   |                                    690 |
| 29                    |                   24                   |                                    551 |
| 30                    |                   22                   |                                    446 |
| 31                    |                   20                   |                                    367 |
| 32                    |                   18                   |                                    305 |
| 33                    |                   16                   |                                    257 |
| 34                    |                   15                   |                                    218 |
| 35                    |                   14                   |                                    187 |

In reality not all the classes will have the same number of objects but the table gives us a rough idea of how easy it will be to create a memorizable set of classes.

For example, it is very easy to create 30 classes with 446 elements each.

However memorizing 30 different objects is very hard for the end user.

On the other hand memorizing only 10 elements is easy for the end user, <br> but constructing 10 classes with 80 million + elements is not easy.

e.g. We were able to compile a list of international movies of only 45000+ elements.

### Suggested classes

Right now I am constructing the list of classes and elements within each that will make your seed phrases memorizable.
Here are some suggestions

- Movies
- Birds
- Historical Figures
- Song / Music

Contributions are welcome as pull requests or discussions in Github issues.

Feel free to reach out to me at my [website](www.afifahmed.com)

| Type       | Total Elements (N) | $$\lfloor \log_2(N) \rfloor$$ | Occupied | 128 - $$\lfloor \log_2(N) \rfloor$$ |
| ---------- | ------------------ | ----------------------------- | -------- | ----------------------------------- |
| boardGames | 10532              | 13                            | 13       | 115                                 |
| birds      | 11533              | 13                            | 26       | 102                                 |
| paintings  | 13422              | 13                            | 39       | 89                                  |
| movies     | 45466              | 15                            | 54       | 74                                  |
| cities     | 47868              | 15                            | 69       | 59                                  |
| songs      | 57650              | 15                            | 84       | 44                                  |
| people     | 88937              | 16                            | 100      | 28                                  |
| books      | 103063             | 16                            | 116      | 12                                  |
| recipes    | 2231142            | 21                            | 137      | -9                                  |
