# Memory Phrase

Memory Phrase is a novel approach to transforming your 12 or 24-word crypto seed phrases into easy-to-memorize associations.

🔗 **Try it now:** [https://seedphrase.my](https://seedphrase.my)

## 📌 Why Memory Phrase?

Memorizing a random list of 12 or 24 words in order is challenging. However, recalling categorized items—such as movies, songs, or cities—is significantly easier. Memory Phrase leverages this cognitive advantage by mapping each seed word to an item from an intuitive category.

### 🎓 How It Works

Instead of remembering a random list of words, you remember meaningful objects from structured categories. For example:

- **Movie**: _Les Misérables_
- **Fruit**: _Kiwi_
- **Bird**: _Hummingbird_
- **Song**: _Master of Puppets_
- **Recipe**: _Apple Pie_

By associating seed words with these categories, you only need to recall the items—not their order. This process is further reinforced when you engage with the associated objects (e.g., watching the movie or cooking the recipe), strengthening memory retention.

---

## 🚀 Demo

**Experience Memory Phrase in action**: [https://seedphrase.my](https://seedphrase.my)

---

## 🛠 Installation Guide

#### 1. Clone the Repository

```bash
git clone https://github.com/a7i7/memoryphrase.git
cd memoryphrase/webapp
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Run the Application

```bash
npm run dev
```

Now, visit **http://localhost:3000** in your browser.

---

## 🔢 Understanding the Math

A **12-word seed phrase** has an entropy of **2¹²⁸**, and a **24-word seed phrase** has **2²⁵⁶**.

For a 12-word phrase:
\[ N(c_1) \times N(c_2) \times \dots \times N(c_m) = 2^{128} \]

For a 24-word phrase:
\[ N(c_1) \times N(c_2) \times \dots \times N(c_m) = 2^{256} \]

Where:

- **m** = Number of categories
- **N(cᵢ)** = Number of objects in each category

If all categories have the same number of elements:
\[ N(c_1) = N(c_2) = ... = N(c_m) \]

Then, depending on **m**, the required number of items per category is:

| **Number of Categories (m)** | **Required N(cᵢ) for 12-word phrase** | **Required N(cᵢ) for 24-word phrase** |
| ---------------------------- | :-----------------------------------: | ------------------------------------: |
| 10                           |                 7132                  |                              50859009 |
| 11                           |                 3184                  |                              10134189 |
| 12                           |                 1626                  |                               2642246 |
| 13                           |                  921                  |                                847180 |
| 14                           |                  566                  |                                319558 |
| 15                           |                  371                  |                                137271 |
| 16                           |                  256                  |                                 65536 |
| 17                           |                  185                  |                                 34132 |
| 18                           |                  139                  |                                 19113 |
| 19                           |                  107                  |                                 11376 |
| 20                           |                  85                   |                                  7132 |
| 21                           |                  69                   |                                  4675 |
| 22                           |                  57                   |                                  3184 |
| 23                           |                  48                   |                                  2242 |
| 24                           |                  41                   |                                  1626 |
| 25                           |                  35                   |                                  1210 |
| 26                           |                  31                   |                                   921 |
| 27                           |                  27                   |                                   715 |
| 28                           |                  24                   |                                   566 |
| 29                           |                  22                   |                                   455 |
| 30                           |                  20                   |                                   371 |
| 31                           |                  18                   |                                   307 |
| 32                           |                  16                   |                                   256 |
| 33                           |                  15                   |                                   217 |
| 34                           |                  14                   |                                   185 |
| 35                           |                  13                   |                                   160 |

In practice, categories won't have the same number of items, but this table provides an estimate of the trade-offs between the number of categories and their required size.

### 🔍 Choosing the Right Categories

A balance between **number of categories** and **size of each category** is crucial:

✅ Too many categories? Hard to recall all objects.
✅ Too few categories? Requires massive datasets.

### 🎭 Suggested Categories (for 12-word phrases)

The following categories provide a good balance between memorability and feasibility:

- **Board Games**
- **Birds**
- **Paintings**
- **Recipes**
- **Movies**
- **Cities**
- **Songs**
- **People**
- **Books**

#### 📊 Data Breakdown

| **Category** | **Total Elements (N)** | **log₂(N)** | **Entropy Used** | **Remaining Bits** |
| ------------ | ---------------------- | ----------- | ---------------- | ------------------ |
| boardGames   | 10334                  | 13          | 13               | 115                |
| birds        | 11503                  | 13          | 26               | 102                |
| paintings    | 13140                  | 13          | 39               | 89                 |
| recipes      | 38879                  | 15          | 54               | 74                 |
| movies       | 42840                  | 15          | 69               | 59                 |
| cities       | 44372                  | 15          | 84               | 44                 |
| songs        | 57623                  | 15          | 99               | 29                 |
| people       | 88146                  | 16          | 115              | 13                 |
| books        | 96608                  | 16          | 131              | -3                 |

This structured approach ensures an optimal balance between **ease of memorization** and **security.**

---

## 🤝 Contributing

We welcome contributions! Submit pull requests or open discussions in GitHub issues.

---

**Built with 💡 to make crypto security human-friendly.** 🔐
