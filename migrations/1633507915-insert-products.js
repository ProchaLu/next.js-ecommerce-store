const products = [
  {
    name: 'Colombia Home Jersey',
    brand: 'Adidas',
    price: 9000,
    description:
      'There is starpower and firepower in this Colombia team that few across world football can equal. Now, qualifying for the FIFA World Cup ™ and taking on the regional competition in the 2021 Copa America, the Colombians don this classic top – simple in execution with the Colombian colorway added on via accents on the collar and sleeve cuffs. Colombia silhouette with the national flag design inside features on the back neck.',
    nationality: 'Colombia',
    item_stock: 200,
  },
  {
    name: 'Germany Away Jersey',
    brand: 'Adidas',
    price: 9000,
    description:
      'Germany arrives on the adidas Condivo jersey template with a blackout effect, featuring monochromatic adidas logo and federation crest. The setup makes the German-flag-inspired sleeve cuffs pop, as well as the subtle red and yellow touches at the collar and on the back neck.',
    nationality: 'Germany',
    item_stock: 200,
  },
  {
    name: 'England Away Jersey',
    brand: 'Nike',
    price: 9000,
    description:
      'All blue with a red monochrome crest, swoosh and side stripes that burst off the scene, the England away is sure to sweep up all the attention while the home kit sticks to the basics. That’s why you’re here, right? Looking for a little more oomph in your England kit? You’ve found it, as it’s not just the color but the all-over graphic pattern that demands attention – a graphic that’s Nike designed and meant to capture the nuances of inclusivity and diversity represented in England and in the national team. Lastly, the shirt features another nod to ’90s jersey design with a fold-down collar, fastened by a button inscribed with the words “We are Lions/We are England.”',
    nationality: 'England',
    item_stock: 200,
  },
  {
    name: 'France Home Jersey',
    brand: 'Nike',
    price: 9000,
    description:
      'Two generations of world champions are connected in the 2020 national team collection that celebrates the best of contemporary French streetwear and art. As in 2018, when Les Bleus emulated the heroes of 1998 by capturing the nation’s second global crown, the federation will play with a red band stretching proudly across the chest of its home kit to signify fraternity. In addition to the red band, France’s new home jersey takes its lead from the iconic marinière design with blue stripes flowing horizontally over a darker blue base. The pattern is broken by the singular red stripe, which shoots prominently across the chest.',
    nationality: 'France',
    item_stock: 200,
  },
  {
    name: 'Italy Home Jersey',
    brand: 'Puma',
    price: 9000,
    description:
      'The 20/21 Italy home jersey celebrates the new wave of talent developing in the Italian infrastructure, using patterns inspired by Renaissance-era fabrics and architecture. Woven in with the Italian blue and covered back and front in the culture and ideology that shaped Italy – who are we kidding – that shaped the world, this crafted-from-culture kit is one for the history books.',
    nationality: 'Italy',
    item_stock: 200,
  },
  {
    name: 'Portugal Away Jersey',
    brand: 'Nike',
    price: 9000,
    description:
      "Portugal’s new away is a showstopper with a teal base color taking inspiration from the team’s 2016 away kit, while the classic, color-blocked horizontal stripes are borrowed from the federation's 2018 training top. The lowest of the three hoops flows all the way around the back of the jersey, while black cuffs and side stripes frame the design perfectly. Does another European championship await while Ronaldo is still at his peak?",
    nationality: 'Portugal',
    item_stock: 200,
  },
  {
    name: 'Brasil Home Jersey',
    brand: 'Nike',
    price: 9000,
    description:
      'You may find the simple presentation of the latest Brazil home top a bit plain, but the jersey is a callout to the famous 1970 World Cup winning strip – a time when all jerseys were bold and straightforward, lacking the graphic elements and design flair we see today. Plus, what is a Brazil jersey if not solid yellow flanked by green trim? The graphic design does play in on the sleeve and collar trim, using a tonal triangular patter in tandem with what we see on the away jersey. That 1970 side brought forth a genius that still influences Brazil today, clearly – as the home top has a stylized “70” on the inside neck. Remember the greats, wear a classic, support the Seleção.',
    nationality: 'Brasil',
    item_stock: 200,
  },
  {
    name: 'Belgium Home Jersey',
    brand: 'Adidas',
    price: 9000,
    description:
      'Because Euro 2020 takes place across 12 different borders this summer, adidas’ design campaign celebrates the blending of cultures, countries and colors across an entire continent.That’s on full display here on the new Belgium 2020 home kit where paintbrush stroke graphics create a multi-sashed look across the chest. They overlap and connect like the tournament they were built for, and when you take a step back and look at the bigger picture, you see they form the shape of a “B,” for Belgium.',
    nationality: 'Belgium',
    item_stock: 200,
  },
  {
    name: 'Netherland Away Jersey',
    brand: 'Nike',
    price: 9000,
    description:
      'If you like black jerseys, you’ve come to the right place. The orange of the Oranje bursts off the clean Netherlands away jersey for Euro 20/21 in the loudest of fashions, with monochrome crest, side stripes and swoosh complimenting the soft orange stripes on the collar. A beauty, without a doubt.',
    nationality: 'Netherland',
    item_stock: 200,
  },
  {
    name: 'Nigeria Away Jersey',
    brand: 'Nike',
    price: 9000,
    description:
      'Nike and Nigeria drop a set of showstoppers once again for the federation that’s known across world football not just for their stylish play on the field, but their style off of it as well. Hand-in-hand Nike/Nigeria Football Federation collaboration has born us this new gem; an away jersey inspired by Onaism, a traditional artistic movement central to Nigerian design and craft – represented best in the trim details seen above. An eagle feather aesthetic, creatively distorted, continuously repeats in ascending size to create punchy visual impact.',
    nationality: 'Nigeria',
    item_stock: 200,
  },
];

// insert products in table
exports.up = async function up(sql) {
  console.log('insert products in products-table...');
  for (const product of products) {
    await sql`
      INSERT INTO products
        (name, brand, price, description, nationality, item_stock)
      VALUES
        (${product.name}, ${product.brand}, ${product.price}, ${product.description}, ${product.nationality}, ${product.item_stock})
    `;
  }
};

// remove items from table
exports.down = async function down(sql) {
  console.log('delete all products from products-table');
  for (const product of products) {
    await sql`
  DELETE FROM
    products
  WHERE
    name = ${product.name}
    `;
  }
};
