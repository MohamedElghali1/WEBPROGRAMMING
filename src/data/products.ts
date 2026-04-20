import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  colors: string[];
  sizes: string[];
  category: "T-shirts" | "Shorts" | "Shirts" | "Hoodie" | "Jeans";
  style: "Casual" | "Formal" | "Party" | "Gym";
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Striped Polo Shirt",
    price: 212,
    rating: 4.5,
    reviewCount: 42,
    image: p1,
    images: [p1, p5, p6],
    colors: ["#1e3a8a", "#000000", "#ffffff"],
    sizes: ["S", "M", "L", "XL"],
    category: "Shirts",
    style: "Casual",
    description:
      "A classic striped polo crafted from breathable premium cotton. Cut for a refined regular fit with a soft ribbed collar and tonal stitching for an effortless everyday look.",
  },
  {
    id: "2",
    name: "Denim Jacket & Tee Set",
    price: 145,
    originalPrice: 200,
    discountPercent: 27,
    rating: 4.0,
    reviewCount: 31,
    image: p2,
    images: [p2, p4, p1],
    colors: ["#3b82f6", "#1f2937", "#f3f4f6"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Shirts",
    style: "Casual",
    description:
      "Relaxed washed denim layered over a clean white tee. A wardrobe staple that works from weekend brunches to city nights.",
  },
  {
    id: "3",
    name: "Slim Fit Black Jeans",
    price: 80,
    rating: 3.5,
    reviewCount: 14,
    image: p3,
    images: [p3, p8, p2],
    colors: ["#000000", "#374151", "#1e40af"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Jeans",
    style: "Casual",
    description:
      "Jet-black slim fit jeans with a touch of stretch for all-day comfort. Finished with classic five-pocket styling.",
  },
  {
    id: "4",
    name: "Graphic Print T-Shirt",
    price: 145,
    originalPrice: 242,
    discountPercent: 40,
    rating: 4.5,
    reviewCount: 145,
    image: p4,
    images: [p4, p1, p7],
    colors: ["#ea580c", "#000000", "#ffffff"],
    sizes: ["S", "M", "L", "XL"],
    category: "T-shirts",
    style: "Casual",
    description:
      "Bold graphic tee printed on heavyweight organic cotton. A statement piece designed to stand out.",
  },
  {
    id: "5",
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 232,
    discountPercent: 8,
    rating: 5.0,
    reviewCount: 87,
    image: p5,
    images: [p5, p1, p6],
    colors: ["#1e3a8a", "#7f1d1d", "#111827"],
    sizes: ["S", "M", "L", "XL"],
    category: "Shirts",
    style: "Formal",
    description:
      "Sharp vertical stripes on a tailored poplin body. Dress it up with a blazer or keep it open and easy.",
  },
  {
    id: "6",
    name: "Courage Graphic Tee",
    price: 145,
    rating: 4.0,
    reviewCount: 56,
    image: p1,
    images: [p1, p4, p7],
    colors: ["#ea580c", "#000000"],
    sizes: ["S", "M", "L"],
    category: "T-shirts",
    style: "Casual",
    description:
      "Illustrated fox graphic on a premium cotton tee. Hand-screened prints with a soft, worn-in finish.",
  },
  {
    id: "7",
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 3.0,
    reviewCount: 22,
    image: p8,
    images: [p8, p2],
    colors: ["#93c5fd", "#1f2937", "#f3f4f6"],
    sizes: ["S", "M", "L", "XL"],
    category: "Shorts",
    style: "Gym",
    description:
      "Lightweight bermuda shorts with an elasticated drawcord waist. Quick-dry fabric perfect for off-duty days.",
  },
  {
    id: "8",
    name: "Faded Skinny Jeans",
    price: 210,
    rating: 4.5,
    reviewCount: 64,
    image: p3,
    images: [p3, p2],
    colors: ["#1f2937", "#000000"],
    sizes: ["S", "M", "L", "XL"],
    category: "Jeans",
    style: "Casual",
    description:
      "Skinny-fit jeans in a timeless faded wash. Soft hand-feel with just enough stretch to keep their shape.",
  },
  {
    id: "9",
    name: "Orange Accent Polo",
    price: 242,
    rating: 4.8,
    reviewCount: 19,
    image: p6,
    images: [p6, p1],
    colors: ["#ea580c", "#000000", "#ffffff"],
    sizes: ["S", "M", "L", "XL"],
    category: "Shirts",
    style: "Formal",
    description:
      "Bright orange polo with contrast tipping at the collar and cuffs. A modern twist on a timeless silhouette.",
  },
  {
    id: "10",
    name: "Active Performance Set",
    price: 120,
    originalPrice: 160,
    discountPercent: 25,
    rating: 4.6,
    reviewCount: 38,
    image: p7,
    images: [p7, p8],
    colors: ["#000000", "#6b7280"],
    sizes: ["XS", "S", "M", "L"],
    category: "T-shirts",
    style: "Gym",
    description:
      "Four-way stretch activewear set built for movement. Sweat-wicking technical fabric with a second-skin feel.",
  },
  {
    id: "11",
    name: "Editorial Statement Coat",
    price: 320,
    originalPrice: 400,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 27,
    image: p4,
    images: [p4, p5],
    colors: ["#111827", "#6b7280"],
    sizes: ["S", "M", "L", "XL"],
    category: "Hoodie",
    style: "Party",
    description:
      "Oversized editorial coat with a dropped shoulder and belted waist. Made for striking silhouettes and late nights.",
  },
  {
    id: "12",
    name: "Classic Blue Shorts",
    price: 65,
    rating: 4.2,
    reviewCount: 41,
    image: p8,
    images: [p8, p7],
    colors: ["#93c5fd", "#1e40af", "#000000"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Shorts",
    style: "Casual",
    description:
      "Relaxed cotton-twill shorts in a soft sky blue. An easy warm-weather essential.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    rating: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes.",
  },
  {
    name: "James L.",
    rating: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    name: "Olivia P.",
    rating: 5,
    text: "Shop.co has completely transformed how I shop for clothes online. The customer service is top notch and the fits are always spot on. Highly recommended!",
  },
  {
    name: "Chris D.",
    rating: 5,
    text: "Quality, style, and fast shipping — Shop.co checks every box. I've become a loyal customer and never looked back.",
  },
];
