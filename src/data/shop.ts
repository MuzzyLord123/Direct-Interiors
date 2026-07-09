// AUTO-GENERATED from the live Ceilings Direct (Ecwid) store — real products,
// prices (GBP), SKUs, descriptions and images. Regenerate with scripts/scrape-shop.
// Prices are the amount shown on ceilings-direct.com (treated as the final,
// VAT-inclusive charge). TODO(client): confirm VAT treatment for invoicing.
export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  sku: string;
  price: number;        // GBP
  pricePence: number;   // for Stripe (minor units)
  category: string;
  image: string;        // OptimizedImage manifest key
  description: string;
  specs: { k: string; v: string }[];
  inStock: boolean;
  shippingRequired: boolean;
}
export interface ShopCategory { name: string; slug: string; count: number }

export const shopCategories: ShopCategory[] = [
  {
    "name": "Ceiling Tiles",
    "slug": "ceiling-tiles",
    "count": 51
  },
  {
    "name": "Ceiling Grid",
    "slug": "ceiling-grid",
    "count": 1
  },
  {
    "name": "Metal Framing Ceiling Products",
    "slug": "metal-framing-ceiling-products",
    "count": 1
  },
  {
    "name": "Metal Stud & Track",
    "slug": "metal-stud-track",
    "count": 1
  }
];

export const shopProducts: ShopProduct[] = [
 {
  "id": "444166946",
  "slug": "amf-ecomin-planet-1200-x-600mm-square-edge-ceiling-tiles",
  "name": "AMF Ecomin Planet 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00035",
  "price": 93,
  "pricePence": 9300,
  "category": "Ceiling Tiles",
  "image": "shop-444166946",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 12 Coverage per box (M2) - 8.64",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444161873",
  "slug": "amf-ecomin-planet-600-x-600mm-square-edge-ceiling-tiles",
  "name": "AMF Ecomin Planet 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00026",
  "price": 77,
  "pricePence": 7700,
  "category": "Ceiling Tiles",
  "image": "shop-444161873",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 20 Coverage per box (M2) - 7.2",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444185479",
  "slug": "amf-thermatex-fine-stratos-micro-perforated-sk-1200-x-600mm-square-edg",
  "name": "AMF Thermatex Fine Stratos Micro Perforated SK 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00037",
  "price": 115,
  "pricePence": 11500,
  "category": "Ceiling Tiles",
  "image": "shop-444185479",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Sand Textured Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 10 Coverage per box (M2) - 7.2",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Sand"
   },
   {
    "k": "Textured Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444185391",
  "slug": "amf-thermatex-fine-stratos-micro-perforated-sk-600-x-600mm-square-edge",
  "name": "AMF Thermatex Fine Stratos Micro Perforated SK 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00028",
  "price": 91,
  "pricePence": 9100,
  "category": "Ceiling Tiles",
  "image": "shop-444185391",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Sand Textured Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Sand"
   },
   {
    "k": "Textured Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444166874",
  "slug": "amf-thermatex-fine-stratos-micro-perforated-vt24-tegular-600-x-600mm-r",
  "name": "AMF Thermatex Fine Stratos Micro Perforated VT24 Tegular 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00030",
  "price": 110,
  "pricePence": 11000,
  "category": "Ceiling Tiles",
  "image": "shop-444166874",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Appearance - Sand Textured Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Appearance",
    "v": "Sand"
   },
   {
    "k": "Textured Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444187758",
  "slug": "amf-thermatex-fine-stratos-unperf-sk-1200-x-600mm-square-edge-ceiling-",
  "name": "AMF Thermatex Fine Stratos Unperf. SK 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00036",
  "price": 117,
  "pricePence": 11700,
  "category": "Ceiling Tiles",
  "image": "shop-444187758",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Sand Textured Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 10 Coverage per box (M2) - 7.2",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Sand"
   },
   {
    "k": "Textured Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444166862",
  "slug": "amf-thermatex-fine-stratos-unperf-sk-600-x-600mm-square-edge-ceiling-t",
  "name": "AMF Thermatex Fine Stratos Unperf. SK 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00029",
  "price": 86,
  "pricePence": 8600,
  "category": "Ceiling Tiles",
  "image": "shop-444166862",
  "description": "Tile Size - 600x600mm (595x595mm) E dge Detail - Square Edge Appearance - Sand Textured Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "E dge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Sand"
   },
   {
    "k": "Textured Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444161963",
  "slug": "amf-thermatex-fine-stratos-unperf-vt24-600-x-600mm-reveal-edge-24mm-gr",
  "name": "AMF Thermatex Fine Stratos Unperf. VT24 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00031",
  "price": 99,
  "pricePence": 9900,
  "category": "Ceiling Tiles",
  "image": "shop-444161963",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Appearance - Sand Textured Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Appearance",
    "v": "Sand"
   },
   {
    "k": "Textured Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444180667",
  "slug": "amf-thermatex-star-sk-1200-x-600mm-square-edge-ceiling-tiles",
  "name": "AMF Thermatex Star SK 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00038",
  "price": 81,
  "pricePence": 8100,
  "category": "Ceiling Tiles",
  "image": "shop-444180667",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 10 Coverage per box (M2) - 7.2",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444161976",
  "slug": "amf-thermatex-star-sk-600-x-600mm-square-edge-ceiling-tiles",
  "name": "AMF Thermatex Star SK 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00032",
  "price": 58,
  "pricePence": 5800,
  "category": "Ceiling Tiles",
  "image": "shop-444161976",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444185382",
  "slug": "amf-topiq-prime-sk-600-x-600mm-square-edge-ceiling-tiles",
  "name": "AMF Topiq Prime SK 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00027",
  "price": 71,
  "pricePence": 7100,
  "category": "Ceiling Tiles",
  "image": "shop-444185382",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - AMF/Knauf Box Quantity - 14 Coverage per box (M2) - 5.04",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444125068",
  "slug": "armstrong-bioguard-acoustic-board-bp2549m-600-x-600mm-square-edge-ceil",
  "name": "Armstrong Bioguard Acoustic Board (BP2549M) 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00016",
  "price": 119,
  "pricePence": 11900,
  "category": "Ceiling Tiles",
  "image": "shop-444125068",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 14 Coverage per box (M2 ) - 5.04",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444126099",
  "slug": "armstrong-bioguard-acoustic-tegular-bp2551m-600-x-600mm-reveal-edge-24",
  "name": "Armstrong Bioguard Acoustic Tegular (BP2551M) 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00018",
  "price": 125,
  "pricePence": 12500,
  "category": "Ceiling Tiles",
  "image": "shop-444126099",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Appearance - Smooth Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 14 Coverage per box (M2) - 5.04",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444126033",
  "slug": "armstrong-bioguard-plain-board-bp2221m-600-x-600mm-square-edge-ceiling",
  "name": "Armstrong Bioguard Plain Board (BP2221M) 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00015",
  "price": 123,
  "pricePence": 12300,
  "category": "Ceiling Tiles",
  "image": "shop-444126033",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444124808",
  "slug": "armstrong-bioguard-plain-tegular-bp2223m-600-x-600mm-reveal-edge-24mm-",
  "name": "Armstrong Bioguard Plain Tegular (BP2223M) 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00017",
  "price": 130,
  "pricePence": 13000,
  "category": "Ceiling Tiles",
  "image": "shop-444124808",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Edge Appearance - Smooth Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444135821",
  "slug": "armstrong-cortega-board-bp9101m-1200-x-600mm-square-edge-ceiling-tiles",
  "name": "Armstrong Cortega Board (BP9101M) 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00021",
  "price": 134,
  "pricePence": 13400,
  "category": "Ceiling Tiles",
  "image": "shop-444135821",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 10 Coverage per box (M2) - 7.2",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444123273",
  "slug": "armstrong-cortega-board-bp9102m-600-x-600mm-square-edge-ceiling-tiles",
  "name": "Armstrong Cortega Board (BP9102M) 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00011",
  "price": 96,
  "pricePence": 9600,
  "category": "Ceiling Tiles",
  "image": "shop-444123273",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444123910",
  "slug": "armstrong-cortega-tegular-bp9105m-600-x-600mm-reveal-edge-24mm-grid-ce",
  "name": "Armstrong Cortega Tegular (BP9105M) 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00012",
  "price": 133,
  "pricePence": 13300,
  "category": "Ceiling Tiles",
  "image": "shop-444123910",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "348168757",
  "slug": "armstrong-dune-evo-board-bp5460m-600-x-600mm-square-edge-ceiling-tiles",
  "name": "Armstrong Dune eVo Board (BP5460M) 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00002",
  "price": 91,
  "pricePence": 9100,
  "category": "Ceiling Tiles",
  "image": "shop-348168757",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Sand Textured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Sand"
   },
   {
    "k": "Textured Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444135306",
  "slug": "armstrong-dune-evo-board-bp5461m-1200-x-600mm-square-edge-ceiling-tile",
  "name": "Armstrong Dune eVo Board (BP5461M) 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00020",
  "price": 114,
  "pricePence": 11400,
  "category": "Ceiling Tiles",
  "image": "shop-444135306",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Sand Textured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 10 Coverage per box (M2) - 7.2",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Sand"
   },
   {
    "k": "Textured Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444078878",
  "slug": "armstrong-dune-evo-microlook-bp5464m-600-x-600mm-reveal-edge-15mm-grid",
  "name": "Armstrong Dune eVo Microlook (BP5464M) 600 x 600mm Reveal Edge (15mm Grid) Ceiling Tiles",
  "sku": "000011",
  "price": 116,
  "pricePence": 11600,
  "category": "Ceiling Tiles",
  "image": "shop-444078878",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal/Microlook (15mm grid) Appearance - Sand Textured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal/Microlook (15mm grid)"
   },
   {
    "k": "Appearance",
    "v": "Sand"
   },
   {
    "k": "Textured Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444058343",
  "slug": "armstrong-dune-evo-tegular-bp5462m-600-x-600mm-reveal-edge-24mm-grid-c",
  "name": "Armstrong Dune eVo Tegular (BP5462M) 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00008",
  "price": 92,
  "pricePence": 9200,
  "category": "Ceiling Tiles",
  "image": "shop-444058343",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Edge Appearance - Sand Textured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Edge Appearance",
    "v": "Sand"
   },
   {
    "k": "Textured Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444147927",
  "slug": "armstrong-fine-fissured-black-bp9121mbk-600-x-600mm-square-edge",
  "name": "Armstrong Fine Fissured Black (BP9121MBK) – 600 x 600mm Square Edge",
  "sku": "00025",
  "price": 175,
  "pricePence": 17500,
  "category": "Ceiling Tiles",
  "image": "shop-444147927",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Fissured/BLACK Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured/BLACK"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444147876",
  "slug": "armstrong-fine-fissured-board-bp9120m-1200-x-600mm-square-edge-ceiling",
  "name": "Armstrong Fine Fissured Board (BP9120M) 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00022",
  "price": 98,
  "pricePence": 9800,
  "category": "Ceiling Tiles",
  "image": "shop-444147876",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 10 Coverage per box (M2) - 7.2",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444090014",
  "slug": "armstrong-fine-fissured-board-bp9121m-600-x-600mm-square-edge-ceiling-",
  "name": "Armstrong Fine Fissured Board (BP9121M) 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00010",
  "price": 77,
  "pricePence": 7700,
  "category": "Ceiling Tiles",
  "image": "shop-444090014",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444126342",
  "slug": "armstrong-hydroboard-board-bp3687m-600-x-600mm-square-edge-ceiling-til",
  "name": "Armstrong Hydroboard Board (BP3687M) 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00019",
  "price": 445,
  "pricePence": 44500,
  "category": "Ceiling Tiles",
  "image": "shop-444126342",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 40 Coverage per box (M2) - 14.4",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444090008",
  "slug": "armstrong-tatra-bp962m-tegular-600-x-600mm-reveal-edge-24mm-grid-ceili",
  "name": "Armstrong Tatra (BP962M) Tegular 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00009",
  "price": 126,
  "pricePence": 12600,
  "category": "Ceiling Tiles",
  "image": "shop-444090008",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444135841",
  "slug": "armstrong-tatra-board-bp952m-1200-x-600mm-square-edge-ceiling-tiles",
  "name": "Armstrong Tatra Board (BP952M) 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00023",
  "price": 86,
  "pricePence": 8600,
  "category": "Ceiling Tiles",
  "image": "shop-444135841",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 10 Coverage per box (M2) - 7.2",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444075180",
  "slug": "armstrong-tatra-board-bp958m-600-x-600mm-square-edge-ceiling-tiles",
  "name": "Armstrong Tatra Board (BP958M) 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "0006",
  "price": 65,
  "pricePence": 6500,
  "category": "Ceiling Tiles",
  "image": "shop-444075180",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Fissured Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Fissured"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444110129",
  "slug": "armstrong-ultima-plus-board-bp7661m-600-x-600mm-square-edge-ceiling-ti",
  "name": "Armstrong Ultima Plus Board (BP7661M) 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00013",
  "price": 110,
  "pricePence": 11000,
  "category": "Ceiling Tiles",
  "image": "shop-444110129",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 10 Coverage per box (M2) - 3.6",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444134381",
  "slug": "armstrong-ultima-plus-board-bp7663m-1200-x-600mm-square-edge-ceiling-t",
  "name": "Armstrong Ultima Plus Board (BP7663M) 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00024",
  "price": 215,
  "pricePence": 21500,
  "category": "Ceiling Tiles",
  "image": "shop-444134381",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 8 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444124775",
  "slug": "armstrong-ultima-plus-tegular-bp7664m-600-x-600mm-reveal-edge-24mm-gri",
  "name": "Armstrong Ultima Plus Tegular (BP7664M) 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00014",
  "price": 128,
  "pricePence": 12800,
  "category": "Ceiling Tiles",
  "image": "shop-444124775",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Appearance - Smooth Material - Mineral Fibre Manufacturer - Zentia Ceiling Tiles, Armstrong Ceiling Tiles Box Quantity - 10 Coverage per box (M2) - 3.6",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "Zentia Ceiling Tiles, Armstrong"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444180689",
  "slug": "black-ceiling-tiles-amf-thermatex-alpha-black-600x600mm-square-edge",
  "name": "Black Ceiling Tiles – AMF Thermatex Alpha Black – 600x600mm Square Edge",
  "sku": "00039",
  "price": 110,
  "pricePence": 11000,
  "category": "Ceiling Tiles",
  "image": "shop-444180689",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Black Material - Mineral Fibre Manufacturer - AMF/Knauf Box Quantity - 10 Coverage per box (M2) - 3.6",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Black"
   },
   {
    "k": "Material",
    "v": "Mineral"
   },
   {
    "k": "Fibre Manufacturer",
    "v": "AMF/Knauf"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445094340",
  "slug": "british-gypsum-satin-spar-wipeable-1200-x-600mm-square-edge-ceiling-ti",
  "name": "British Gypsum Satin Spar (Wipeable) 1200 x 600mm Square Edge Ceiling Tiles (sold individually)",
  "sku": "00057",
  "price": 10.2,
  "pricePence": 1020,
  "category": "Ceiling Tiles",
  "image": "shop-445094340",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Smooth (wipeable) Material - Gypsum Plasterboard (Vinyl Faced) Manufacturer - British Gypsum Box Quantity - *SOLD INDIVIDUALLY* Coverage per box (M2) - 0.72",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth (wipeable)"
   },
   {
    "k": "Material",
    "v": "Gypsum Plasterboard (Vinyl"
   },
   {
    "k": "Faced) Manufacturer",
    "v": "British"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445088452",
  "slug": "british-gypsum-satin-spar-wipeable-600-x-600mm-square-edge-ceiling-til",
  "name": "British Gypsum Satin Spar (Wipeable) 600 x 600mm Square Edge Ceiling Tiles (sold individually)",
  "sku": "00056",
  "price": 5.1,
  "pricePence": 510,
  "category": "Ceiling Tiles",
  "image": "shop-445088452",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth (wipeable) Material - Gypsum Plasterboard (Vinyl Faced) Manufacturer - British Gypsum Box Quantity - *SOLD INDIVIDUALLY* Coverage per box (M2) - 0.36",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth (wipeable)"
   },
   {
    "k": "Material",
    "v": "Gypsum Plasterboard (Vinyl"
   },
   {
    "k": "Faced) Manufacturer",
    "v": "British"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445085030",
  "slug": "rockfon-artic-a24-1200-x-600mm-square-edge-ceiling-tiles",
  "name": "Rockfon Artic A24 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00047",
  "price": 157,
  "pricePence": 15700,
  "category": "Ceiling Tiles",
  "image": "shop-445085030",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 16 Coverage per box (M2) - 11.52",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444188285",
  "slug": "rockfon-artic-a24-600-x-600mm-square-edge-ceiling-tiles",
  "name": "Rockfon Artic A24 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00040",
  "price": 149,
  "pricePence": 14900,
  "category": "Ceiling Tiles",
  "image": "shop-444188285",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 32 Coverage per box (M2) - 11.52",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445035232",
  "slug": "rockfon-artic-e15-microlook-600-x-600mm-reveal-edge-15mm-grid-ceiling-",
  "name": "Rockfon Artic E15 Microlook 600 x 600mm Reveal Edge (15mm Grid) Ceiling Tiles",
  "sku": "00044",
  "price": 99,
  "pricePence": 9900,
  "category": "Ceiling Tiles",
  "image": "shop-445035232",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal/Microlook (15mm grid) Appearance - Smooth Material - Insulated (fibreglass) Manufacturer - Rockfon Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal/Microlook (15mm grid)"
   },
   {
    "k": "Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibreglass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "444188311",
  "slug": "rockfon-artic-e24-tegular-600-x-600mm-reveal-edge-24mm-grid-ceiling-ti",
  "name": "Rockfon Artic E24 Tegular 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00041",
  "price": 95,
  "pricePence": 9500,
  "category": "Ceiling Tiles",
  "image": "shop-444188311",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445085008",
  "slug": "rockfon-blanka-a-600-x-600mm-square-edge-ceiling-tiles",
  "name": "Rockfon Blanka A 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00045",
  "price": 362,
  "pricePence": 36200,
  "category": "Ceiling Tiles",
  "image": "shop-445085008",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 24 Coverage per box (M2) - 8.64",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445086043",
  "slug": "rockfon-blanka-e24-tegular-600-x-600mm-reveal-edge-24mm-grid-ceiling-t",
  "name": "Rockfon Blanka E24 Tegular 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00046",
  "price": 230,
  "pricePence": 23000,
  "category": "Ceiling Tiles",
  "image": "shop-445086043",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 12 Coverage per box (M2) - 4.32",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445085139",
  "slug": "rockfon-koral-a-1200-x-600mm-square-edge-ceiling-tiles",
  "name": "Rockfon Koral A 1200 x 600mm Square Edge Ceiling Tiles",
  "sku": "00055",
  "price": 297,
  "pricePence": 29700,
  "category": "Ceiling Tiles",
  "image": "shop-445085139",
  "description": "Tile Size - 1200x600mm (1195x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 16 Coverage per box (M2) - 11.52",
  "specs": [
   {
    "k": "Tile Size",
    "v": "1200x600mm (1195x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445088325",
  "slug": "rockfon-koral-a-600-x-600mm-square-edge-ceiling-tiles",
  "name": "Rockfon Koral A 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00053",
  "price": 295,
  "pricePence": 29500,
  "category": "Ceiling Tiles",
  "image": "shop-445088325",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 32 C overage per box (M2) - 11.52",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445088326",
  "slug": "rockfon-koral-e24-tegular-600-x-600mm-reveal-edge-24mm-grid-ceiling-ti",
  "name": "Rockfon Koral E24 Tegular 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00054",
  "price": 182,
  "pricePence": 18200,
  "category": "Ceiling Tiles",
  "image": "shop-445088326",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 16 Coverage per box (M2 ) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445086058",
  "slug": "rockfon-medicare-a-600-x-600mm-square-edge-ceiling-tiles",
  "name": "Rockfon Medicare A 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00048",
  "price": 297,
  "pricePence": 29700,
  "category": "Ceiling Tiles",
  "image": "shop-445086058",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 32 Coverage per box (M2) - 11.52",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445086119",
  "slug": "rockfon-medicare-e15-600-x-600mm-reveal-edge-15mm-grid-ceiling-tiles",
  "name": "Rockfon Medicare E15 600 x 600mm Reveal Edge (15mm Grid) Ceiling Tiles",
  "sku": "00051",
  "price": 179,
  "pricePence": 17900,
  "category": "Ceiling Tiles",
  "image": "shop-445086119",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal/Microlook (15mm grid) Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal/Microlook (15mm grid)"
   },
   {
    "k": "Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445085080",
  "slug": "rockfon-medicare-e24-600-x-600mm-reveal-edge-24mm-grid-ceiling-tiles",
  "name": "Rockfon Medicare E24 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00050",
  "price": 159,
  "pricePence": 15900,
  "category": "Ceiling Tiles",
  "image": "shop-445085080",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 16 Coverage per box (M2) - 5.76",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445084070",
  "slug": "rockfon-medicare-plus-a-600-x-600mm-square-edge-ceiling-tiles",
  "name": "Rockfon Medicare Plus A 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00049",
  "price": 318,
  "pricePence": 31800,
  "category": "Ceiling Tiles",
  "image": "shop-445084070",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 24 Coverage per box (M2) - 8.64",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445085093",
  "slug": "rockfon-medicare-plus-e24-600-x-600mm-reveal-edge-24mm-grid-ceiling-ti",
  "name": "Rockfon Medicare Plus E24 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00052",
  "price": 195,
  "pricePence": 19500,
  "category": "Ceiling Tiles",
  "image": "shop-445085093",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 12 Coverage per box (M2) - 4.32",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445035632",
  "slug": "rockfon-tropic-alaska-a24-600-x-600mm-square-edge-ceiling-tiles",
  "name": "Rockfon Tropic-Alaska A24 600 x 600mm Square Edge Ceiling Tiles",
  "sku": "00042",
  "price": 170,
  "pricePence": 17000,
  "category": "Ceiling Tiles",
  "image": "shop-445035632",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Square Edge Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 24 Coverage per box (M2) - 8.64",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Square"
   },
   {
    "k": "Edge Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "445035637",
  "slug": "rockfon-tropic-alaska-e24-tegular-600-x-600mm-reveal-edge-24mm-grid-ce",
  "name": "Rockfon Tropic-Alaska E24 Tegular 600 x 600mm Reveal Edge (24mm Grid) Ceiling Tiles",
  "sku": "00043",
  "price": 105,
  "pricePence": 10500,
  "category": "Ceiling Tiles",
  "image": "shop-445035637",
  "description": "Tile Size - 600x600mm (595x595mm) Edge Detail - Reveal Appearance - Smooth Material - Insulated (fibre glass) Manufacturer - Rockfon Box Quantity - 12 Coverage per box (M2) - 4.32",
  "specs": [
   {
    "k": "Tile Size",
    "v": "600x600mm (595x595mm)"
   },
   {
    "k": "Edge Detail",
    "v": "Reveal"
   },
   {
    "k": "Appearance",
    "v": "Smooth"
   },
   {
    "k": "Material",
    "v": "Insulated (fibre glass)"
   },
   {
    "k": "Manufacturer",
    "v": "Rockfon"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "348168748",
  "slug": "amf-ventatec-main-runner-main-tee-bar-3600mm-24mm-standard-suspended-c",
  "name": "AMF Ventatec Main Runner/Main Tee Bar 3600mm (24mm Standard) – Suspended Ceiling Grid",
  "sku": "00000",
  "price": 9,
  "pricePence": 900,
  "category": "Ceiling Grid",
  "image": "shop-348168748",
  "description": "Est. Delivery: 2 – 5 days Single Units - £9.00 + VAT Length: 3.6m Width: 24mm Height: 38mm Joggled end 60-minute fire rating Designed for AMF white-faced interlocking grid",
  "specs": [
   {
    "k": "Designed for AMF white",
    "v": "faced interlocking grid"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "348170719",
  "slug": "mf5-metal-furring-section-3-6m",
  "name": "MF5 Metal Furring Section 3.6m",
  "sku": "00005",
  "price": 5.22,
  "pricePence": 522,
  "category": "Metal Framing Ceiling Products",
  "image": "shop-348170719",
  "description": "Type: MF Ceiling Length: 3600mm Width: 25mm Manufacturer Code – MF5 Product Application - Ceiling",
  "specs": [
   {
    "k": "Manufacturer Code",
    "v": "MF5"
   },
   {
    "k": "Product Application",
    "v": "Ceiling"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 },
 {
  "id": "348168778",
  "slug": "metal-c-stud-50mm-2400mm",
  "name": "Metal C Stud 50mm 2400mm",
  "sku": "00004",
  "price": 4.2,
  "pricePence": 420,
  "category": "Metal Stud & Track",
  "image": "shop-348168778",
  "description": "Partition Type - C Stud Type - C Stud Length – 2400mm *Available in various sizes* This 50mm ‘C’ shaped metal stud is an essential component when making the stud wall and is for vertical use when making a wall.",
  "specs": [
   {
    "k": "Partition Type",
    "v": "C"
   },
   {
    "k": "Stud Type",
    "v": "C"
   }
  ],
  "inStock": true,
  "shippingRequired": true
 }
];

export const getProductBySlug = (slug: string): ShopProduct | undefined =>
  shopProducts.find((p) => p.slug === slug);
export const productsInCategory = (categorySlug: string): ShopProduct[] =>
  shopProducts.filter((p) => shopCategories.find((c) => c.slug === categorySlug)?.name === p.category);
