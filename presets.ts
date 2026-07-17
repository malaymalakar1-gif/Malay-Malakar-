import { PresetModel, StyleAnalysisReport } from "./types";

export const PRESET_MODELS: (PresetModel & { report: StyleAnalysisReport })[] = [
  {
    id: "streetwear_neon",
    name: "Aiden — Shibuya Streetwear",
    gender: "Male / Unisex",
    style: "Streetwear & Trendy",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
    placeholderText: "Oversized graphic windbreaker, cargo pants, neon orange accent tee, and futuristic chunky sneakers.",
    report: {
      overallStyleCategory: "Streetwear",
      styleDescription: "A striking, high-impact urban aesthetic heavily inspired by Tokyo's Shibuya subculture. The outfit masterfully blends relaxed, oversized proportions with deliberate high-visibility color blocking. The centerpiece statement windbreaker creates a strong silhouette, while utility cargo pockets introduce tactile geometric interest, capturing the energetic zeitgeist of contemporary youth fashion.",
      ratingScore: 9,
      colorHarmonyScore: 8,
      detectedItems: [
        {
          name: "Oversized Retro Windbreaker",
          category: "Outerwear",
          color: "Slate Grey & Charcoal",
          description: "Water-resistant matte nylon with drop-shoulder tailoring, dynamic pull-cords, and high functional utility."
        },
        {
          name: "Hi-Vis Accent Crewneck",
          category: "Upper Wear",
          color: "Neon Orange",
          description: "Premium cotton layering piece adding a brilliant high-contrast focal point around the collar and chest."
        },
        {
          name: "Tapered Multi-Pocket Cargoes",
          category: "Lower Wear",
          color: "Deep Tech Black",
          description: "Structured cotton cordura trousers featuring velcro-sealed pockets and elasticated ankle cuffs."
        },
        {
          name: "Chunky Futuristic Sneakers",
          category: "Footwear",
          color: "Ash White & Neon Trim",
          description: "Platform trainers with complex geometric outsoles, reflective piping, and oversized technical mesh."
        }
      ],
      colorPalette: [
        { hex: "#0b0c10", name: "Deep Tech Black", role: "Dominant" },
        { hex: "#1f2833", name: "Charcoal Charcoal", role: "Secondary" },
        { hex: "#ff4500", name: "Neon Flame Orange", role: "Accent" }
      ],
      colorHarmonyAnalysis: "A quintessential street styling formula. The dark, industrial charcoal base provides an anchor, allowing the neon orange accent to pop dynamically without overwhelming the overall composure. The white sneakers help draw the eyes downward, completing a balanced, high-contrast tri-color palette.",
      strengths: [
        "Incredible proportion play (oversized top balanced with tapered cargo ankles).",
        "Masterful placement of a singular high-vibrancy accent color near the neckline to draw focus.",
        "Spot-on texture cohesion using matte nylon, heavy canvas, and molded sneaker tech."
      ],
      improvements: [
        "Add a technical chest rig or belt bag to further enhance the tactical cyberpunk theme.",
        "Consider a silver industrial chain or chrome sunglasses to anchor the urban vibe.",
        "An off-white bean cap would ground the look better on cooler outings."
      ],
      personalAdvice: "This outfit is an absolute winner for casual creative events, streetwear meetups, or music concerts. To escalate the fit to peak level, experiment with rolling up the sleeve hems slightly to expose your wrists, which adds to a casual, effortless look.",
      occasionsAdvice: [
        {
          occasion: "Creative Networking Night",
          suitability: "High",
          reasoning: "Expresses high individuality, aesthetic awareness, and confidence, fitting well within design and art circles.",
          tip: "Keep the neon t-shirt tucked for a slightly tidier demeanor."
        },
        {
          occasion: "High-End Corporate Workspace",
          suitability: "Low",
          reasoning: "The oversized silhouettes, cargo details, and neon tones contradict standard formal executive guidelines.",
          tip: "Substitute the windbreaker for a charcoal unstructured blazer and keep the cargo pants."
        },
        {
          occasion: "Casual Weekend Café",
          suitability: "High",
          reasoning: "Extremely comfortable, functional, and effortlessly stylish under casual daylight settings.",
          tip: "Unzip the windbreaker slightly to let the orange crewneck show more prominently."
        }
      ],
      accessoriesAdvice: [
        "Industrial matte-black carabiner accessory belt ring.",
        "Transparent frame futuristic blue-light blocking sunglasses.",
        "Silver-plated chunky Cuban link bracelet."
      ],
      recommendedColors: [
        "Cyber Crimson Red",
        "Utility Olive Green",
        "Acid Lime Green"
      ],
      celebrityMatches: [
        {
          name: "ASAP Rocky",
          styleReason: "Famed for pioneering the high-fashion streetwear crossover, combining oversized experimental shapes with unexpected fluorescent colors.",
          outfitExample: "Prada industrial cargos paired with neon Undercover parkas and chunky rubber boots."
        },
        {
          name: "Travis Scott",
          styleReason: "Known for earthy base palettes spiced with extreme visual contrasts, industrial cargo accessories, and skate-inspired oversized fits.",
          outfitExample: "Vintage washed streetwear jackets, matching tactical cargo bottoms, and rare high-top trainers."
        }
      ]
    }
  },
  {
    id: "classic_corporate",
    name: "Sophia — Tailored Power Suit",
    gender: "Female / Unisex",
    style: "Formal & Luxury",
    imageUrl: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80",
    placeholderText: "Double-breasted emerald green blazer, matching high-waisted wide-leg trousers, silk ivory camisole, and gold accents.",
    report: {
      overallStyleCategory: "Formal",
      styleDescription: "An exquisite demonstration of modern professional tailoring. The double-breasted structure projects authority and structure, while the deep, rich mineral green elevates the mood far beyond standard monochrome suits. The wide-leg fluid trousers introduce a contemporary architectural flow, striking an elegant balance between formal structure and modern luxury.",
      ratingScore: 10,
      colorHarmonyScore: 10,
      detectedItems: [
        {
          name: "Double-Breasted Mineral Blazer",
          category: "Outerwear",
          color: "Emerald Green",
          description: "Premium wool-blend tailored jacket featuring peaked lapels, structured shoulders, and tortoiseshell front closures."
        },
        {
          name: "High-Waisted Fluid Pleated Trousers",
          category: "Lower Wear",
          color: "Emerald Green",
          description: "Wide-leg flowing trousers with deep front pleats, producing a statuesque, elongated vertical silhouette."
        },
        {
          name: "Lustrous Silk Camisole",
          category: "Upper Wear",
          color: "Ivory White",
          description: "Lightweight, pure silk scoop-neck underpinning that softens the structural tailoring of the blazer."
        },
        {
          name: "Gold Minimalist Accessories",
          category: "Accessory",
          color: "Champagne Gold",
          description: "Ultra-sleek geometric earrings, a delicate layered chain, and structural band rings."
        }
      ],
      colorPalette: [
        { hex: "#0f3a20", name: "Deep Emerald Green", role: "Dominant" },
        { hex: "#fdfefe", name: "Ivory White", role: "Secondary" },
        { hex: "#d4af37", name: "Champagne Gold", role: "Accent" }
      ],
      colorHarmonyAnalysis: "A breathtakingly unified two-tone focus. The rich deep emerald green commands the visual field, while the ivory white camisole injects essential brightness, reflecting light onto the face. The champagne gold metals add luxurious warmth, acting as perfect jewelry-tier accents.",
      strengths: [
        "Perfect monochromatic color block which beautifully elongates the wearer's height.",
        "Impeccable textile balance, pairing the rigid structure of wool tailoring with the liquid drape of silk.",
        "Outstanding fit accuracy—suit shoulders align precisely with the frame without binding or drooping."
      ],
      improvements: [
        "A structured camel or beige trench coat draped over the shoulders would create a world-class layering effect.",
        "Consider a minimalist black leather satchel with matching gold hardware to tie the outfit's utility together.",
        "Add a classic leather-strap watch with a green sunburst dial for custom details."
      ],
      personalAdvice: "This set represents the pinnacle of executive chic. It commands attention effortlessly in business meetings, keynote speeches, or upscale gallery dinners. To take it to the street, wear the blazer open with the sleeves pushed up to the elbows, paired with high-quality white leather sneakers.",
      occasionsAdvice: [
        {
          occasion: "Corporate Keynote Presentation",
          suitability: "High",
          reasoning: "Commanding, professional, elegantly styled, and highly modern without appearing dated or boring.",
          tip: "Keep the blazer buttoned with gold earrings in full focus."
        },
        {
          occasion: "Cocktail Party / Art Reception",
          suitability: "High",
          reasoning: "The emerald hue is rich and festive, easily outshining standard black dresses while maintaining sophisticated elegance.",
          tip: "Remove the blazer and wear the silk camisole and wide trousers alone, using the blazer elegantly draped on the shoulders."
        },
        {
          occasion: "Weekend Outdoor Market",
          suitability: "Low",
          reasoning: "The suit's premium structured tailoring feels overly dramatic and restricted for casual outdoor strolls.",
          tip: "Trade the trousers for premium blue jeans and keep the blazer open for a smart casual vibe."
        }
      ],
      accessoriesAdvice: [
        "Top-grain black boxed leather structured top-handle handbag.",
        "Pointed-toe leather block heels in nude tint.",
        "Vintage gold watch with Roman numerals."
      ],
      recommendedColors: [
        "Rich Burgundy",
        "Cream Beige",
        "Sapphire Blue"
      ],
      celebrityMatches: [
        {
          name: "Cate Blanchett",
          styleReason: "Acclaimed for her power-tailoring choices, often wearing rich jewel-toned suits with sharp shoulders and fluid trousers.",
          outfitExample: "Custom emerald velvet suits or monochromatic pastel double-breasted ensembles."
        },
        {
          name: "Zendaya",
          styleReason: "Famed for pulling off ultra-sharp and structural masculine-cut luxury suits styled with sheer modern feminine energy.",
          outfitExample: "Vibrant single-color fuchsia suits with matching silk shirts and diamond accents."
        }
      ]
    }
  },
  {
    id: "smart_casual_navy",
    name: "Marcus — Smart Casual Blazer",
    gender: "Male / Unisex",
    style: "Smart Casual & Minimalist",
    imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
    placeholderText: "Navy blue unstructured blazer, heather grey merino wool polo, khaki stretch chinos, and dark brown suede chelsea boots.",
    report: {
      overallStyleCategory: "Smart Casual",
      styleDescription: "The gold standard of smart casual versatility. This look expertly softens traditional menswear by replacing a stiff suit jacket with a soft, unstructured navy blazer. Pairing it with a fine-gauge knit polo instead of a rigid button-down preserves a sophisticated tone while promising immense physical comfort. The fit is clean, refined, and entirely approachable.",
      ratingScore: 8,
      colorHarmonyScore: 9,
      detectedItems: [
        {
          name: "Unstructured Tailored Blazer",
          category: "Outerwear",
          color: "Classic Navy",
          description: "Slightly relaxed, unlined hopsack blazer with patch pockets and natural shoulders for a relaxed luxury feel."
        },
        {
          name: "Merino Wool Knit Polo",
          category: "Upper Wear",
          color: "Heather Grey",
          description: "Superfine knit collar shirt with a clean hidden-placket neck, introducing a smooth textured layer."
        },
        {
          name: "Flat-Front Tailored Chinos",
          category: "Lower Wear",
          color: "Sand Khaki",
          description: "Slim-fit stretch heavy cotton trousers, hemmed precisely to sit right above the ankle."
        },
        {
          name: "Suede Chelsea Boots",
          category: "Footwear",
          color: "Dark Chocolate Brown",
          description: "Premium split-suede leather boots with flexible elastic side panels and low-profile rubber soles."
        }
      ],
      colorPalette: [
        { hex: "#0b1d3a", name: "Classic Navy Blue", role: "Dominant" },
        { hex: "#c5b358", name: "Sand Khaki", role: "Secondary" },
        { hex: "#8a7968", name: "Chocolate Suede", role: "Accent" }
      ],
      colorHarmonyAnalysis: "A classic menswear triad. Marine navy and sand khaki create a timeless nautical-business contrast. The heather grey polo softens this transition, and the rich chocolate brown suede grounds the lower frame, completing a balanced, dependable harmony.",
      strengths: [
        "Highly versatile; moves seamlessly from day desks to dinner dates.",
        "Unstructured blazer shoulders align beautifully, avoiding any stiff boardiness.",
        "Excellent shoe selection; suede boots instantly elevate the chinos beyond simple street sneakers."
      ],
      improvements: [
        "Incorporate a textured heavy linen pocket square (white or cream) to add interest to the chest pocket.",
        "Pair with a braided brown leather belt that matches the suede tones of the boots.",
        "Add a modern steel sports watch with a leather band."
      ],
      personalAdvice: "This coordination represents the peak of modern casual professionalism. It's safe, sharp, and highly flattering. To increase style depth, consider opting for a blazer in a micro-check pattern or a knit polo with a contrasting ribbed collar next time.",
      occasionsAdvice: [
        {
          occasion: "Modern Tech Office",
          suitability: "High",
          reasoning: "Hits the absolute sweet spot of professional yet creative, fully aligned with casual tech/design corporate cultures.",
          tip: "Keep the knit polo tucked in with a clean, low-profile leather belt."
        },
        {
          occasion: "Semi-Formal Evening Date",
          suitability: "High",
          reasoning: "Polished enough to show high effort, yet relaxed enough to maintain a welcoming, non-stiff atmosphere.",
          tip: "Spritz a dark woody cologne and leave the blazer unbuttoned."
        },
        {
          occasion: "Sports Gym or Active Tracking",
          suitability: "Low",
          reasoning: "The blazer fabric and suede boots strongly lack the elasticity and sweat-wicking required for athletic physical stress.",
          tip: "Strip down to a crewneck tee and swap suede boots for athletic runners."
        }
      ],
      accessoriesAdvice: [
        "Dark brown braided leather belt.",
        "White textured cotton pocket square with blue stitching.",
        "Minimalist stainless steel automatic watch."
      ],
      recommendedColors: [
        "Olive Drab Green",
        "Burgundy Maroon",
        "Creamy Antique White"
      ],
      celebrityMatches: [
        {
          name: "Ryan Gosling",
          styleReason: "Regularly masters smart-casual tailoring, opting for soft knit polo collar lay-ins inside rich blue unstructured blazers.",
          outfitExample: "Navy blazer, luxury ribbed sweater polo, fitted brown trousers, and vintage lace-up dress shoes."
        },
        {
          name: "Daniel Craig",
          styleReason: "Blends rugged masculinity with crisp British tailoring, often executing clean blazer-and-chinos styling in casual settings.",
          outfitExample: "Structured grey jacket, soft knit layers, sand trousers, and tan leather boots."
        }
      ]
    }
  },
  {
    id: "minimalist_pastel",
    name: "Chloe — Cream Minimalist",
    gender: "Female / Unisex",
    style: "Minimalist & Casual",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    placeholderText: "Oversized cream utility sweatshirt, pastel sage green pleated skirt, canvas shopper tote, and retro-minimalist clean court sneakers.",
    report: {
      overallStyleCategory: "Minimalist",
      styleDescription: "A gorgeous study in soft pastel minimalism and comfort. The outfit projects an ethereal, clean-slate serenity. By combining a cosy heavy-cotton drop-shoulder sweatshirt with a feminine, micro-pleated skirt, the outfit balances boyish leisure with classic flowing elegance. Truly a perfect representation of 'quiet luxury' for daytime off-duty stylings.",
      ratingScore: 9,
      colorHarmonyScore: 9,
      detectedItems: [
        {
          name: "Oversized Loopback Sweatshirt",
          category: "Upper Wear",
          color: "Warm Cream / Ecru",
          description: "Heavy french terry cotton sweater with balloon sleeves, offering high thermal comfort and a architectural drape."
        },
        {
          name: "Pleated Mid-Length Skirt",
          category: "Lower Wear",
          color: "Soft Sage Green",
          description: "A swinging, pleated satin skirt that catches light beautifully, adding dynamic movement to every stride."
        },
        {
          name: "Minimalist Canvas Tote",
          category: "Accessory",
          color: "Natural Ecru Canvas",
          description: "Generous eco-shopper tote bag with tan bridle leather handles, projecting organic simplicity."
        },
        {
          name: "Clean White Court Sneakers",
          category: "Footwear",
          color: "Optic White",
          description: "Low-top leather sneakers with flat laces, tan rubber gumsole, and zero branding marks."
        }
      ],
      colorPalette: [
        { hex: "#f5f2eb", name: "Warm Alabaster Cream", role: "Dominant" },
        { hex: "#b2beb5", name: "Tender Sage Green", role: "Secondary" },
        { hex: "#ffffff", name: "Pure Canvas White", role: "Accent" }
      ],
      colorHarmonyAnalysis: "A sublime pastel palette that radiates fresh, clean springtime energy. The cream and sage green are complementary, bringing out each other's calm organic undertones. The clean white tennis sneakers tie the lower half to the ecru sweatshirt gracefully.",
      strengths: [
        "Exceptional textural contrast—pairing a casual matte loops cotton sweater with shiny satin skirt pleats.",
        "Outstanding color therapy; soft tints represent calm, cleanliness, and sophisticated comfort.",
        "Perfect sneaker pairing; clean vintage tennis shoes prevent the skirt from looking overly stuffy or formal."
      ],
      improvements: [
        "Incorporate a dainty gold coin necklace or thin hoop earrings to add light points near the neck and face.",
        "Define the waistline slightly by doing a neat 'French tuck' of the sweatshirt front hem into the skirt waistband.",
        "Consider retro tortoiseshell hair clips to frame your hairstyle nicely."
      ],
      personalAdvice: "This daytime aesthetic deserves high praise. It's incredibly chic and demonstrates that fashion doesn't have to be loud to make a statement. To transition this to an evening dinner look, simply swap the casual sweatshirt for a tight black turtleneck knit and add black leather block boot heels.",
      occasionsAdvice: [
        {
          occasion: "Creative Strategy Conference",
          suitability: "High",
          reasoning: "Exudes design intellect, approachability, and clean aesthetic control, ideal for creative workspace representation.",
          tip: "Cuff the sleeves slightly and wear tidy natural makeup."
        },
        {
          occasion: "Rainy Afternoon Bookstore Visit",
          suitability: "High",
          reasoning: "Cozy, warm, soft-layered, and entirely suited for indoor browsing and warm sipping settings.",
          tip: "Add a cozy oversized cashmere scarf in a oatmeal brown hue."
        },
        {
          occasion: "High-Visibility Evening Gala",
          suitability: "Low",
          reasoning: "The sweatshirt material and simple canvas tote look too casual, relaxed, and informal for luxury black-tie dinner protocols.",
          tip: "Upgrade the skirt with an elegant matching silk top, add black heels, and carry a leather jewelry clutch."
        }
      ],
      accessoriesAdvice: [
        "Champagne gold coin talisman necklace.",
        "Tortoiseshell-patterned acetate round sunglasses.",
        "Dainty leather-strap gold wristwatch."
      ],
      recommendedColors: [
        "Soft Lavender Grey",
        "Washed Denim Blue",
        "Oatmeal Heather"
      ],
      celebrityMatches: [
        {
          name: "Gwyneth Paltrow",
          styleReason: "The modern queen of quiet luxury, known for layering premium warm creams, soft pastels, and expensive unstructured relaxed shapes.",
          outfitExample: "Cream cashmere crewneck sweaters, silk midi skirts, and simple leather flats."
        },
        {
          name: "Emma Watson",
          styleReason: "Appreciates highly organic, smart, minimalist street layers, sustainable linen, and clean-cut low profile apparel.",
          outfitExample: "Oversized neutral sweaters, light-shaded cotton skirts, and casual canvas totes."
        }
      ]
    }
  }
];
