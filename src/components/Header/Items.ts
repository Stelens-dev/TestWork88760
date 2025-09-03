import TelephoneIcon from "@public/assets/telephone.svg";
import EmailIcon from "@public/assets/email.svg";
import PointIcon from "@public/assets/point.svg";
import HumanIcon from "@public/assets/human.svg";

interface ItemsSrcI {
  src: string;
  width: number;
  height: number;
  blurWidth: number;
  blurHeight: number;
}

interface ItemsI {
  id: number;
  text: string;
  src: ItemsSrcI;
  imgAlt: string;
  href: null | string;
}

interface NavItemI {
  id: number;
  text: string;
}

const Items: ItemsI[] = [
  {
    id: 0,
    text: "+021-95-51-84",
    src: TelephoneIcon,
    imgAlt: "telephone",
    href: null,
  },
  {
    id: 1,
    text: "shop@abelohost.com",
    src: EmailIcon,
    imgAlt: "email",
    href: null,
  },
  {
    id: 2,
    text: "1734 Stonecoal Road",
    src: PointIcon,
    imgAlt: "point",
    href: null,
  },
  {
    id: 3,
    text: "Login",
    src: HumanIcon,
    imgAlt: "human",
    href: "/login",
  },
];

const NavItem: NavItemI[] = [
  {
    id: 1,
    text: "Home",
  },
  {
    id: 2,
    text: "Hot Deals",
  },
  {
    id: 3,
    text: "Categories",
  },
  {
    id: 4,
    text: "Laptops",
  },
  {
    id: 5,
    text: "Smartphones",
  },
  {
    id: 6,
    text: "Cameras",
  },
  {
    id: 7,
    text: "Accessories",
  },
];

export { Items, NavItem };
