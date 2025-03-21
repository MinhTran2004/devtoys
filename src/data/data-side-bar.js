import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

export const DataSettings = [
  {
    key: 'sub9',
    label: "Manage extensions",
    iconLeft: <HomeIcon fontSize="small" />,
  },
  {
    key: 'sub10',
    label: "Settings",
    iconLeft: <HomeIcon fontSize="small" />,
  }
]

export const DataSideBar = [
  {
    key: "sub1",
    label: "All Tools",
    iconLeft: <HomeIcon fontSize="small" />,
    link: "/pages"
  },
  // {
  //   key: "sub9",
  //   label: "Markdown Preview",
  //   iconLeft: <HomeIcon fontSize="small" />,
  // },
  {
    key: "sub2",
    label: "Converters",
    iconLeft: <HomeIcon fontSize="small" />,
    iconRight: <KeyboardArrowDownIcon fontSize="small" />,
    link: "/pages/converters",
    children: [
      {
        key: "sub2-1",
        label: "Cron parser",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/converters/cron-parser",
      },
      // {
      //   key: "sub2-2",
      //   label: "Date",
      //   iconLeft: <HomeIcon fontSize="small" />,
      // },
      {
        key: "sub2-3",
        label: "JSON > Table",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/converters/json-table",
      },
      {
        key: "sub2-4",
        label: "JSON <> YAML",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/converters/json-yaml",
      },
      {
        key: "sub2-5",
        label: "Number Base",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/converters/number-base"
      },
    ],
  },
  {
    key: "sub3",
    label: "Encoders",
    iconLeft: <HomeIcon fontSize="small" />,
    iconRight: <KeyboardArrowDownIcon fontSize="small" />,
    link: "/pages/encoders",
    children: [
      {
        key: "sub3-1",
        label: "Base64 Image",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/encoders/base64-image"
      },
      {
        key: "sub3-2",
        label: "Base64 Text",
        iconLeft: <HomeIcon fontSize="small" />,
        iconRight: <EmojiObjectsIcon fontSize="small" />,
        link: "/pages/encoders/base64-text"
      },
      {
        key: "sub3-3",
        label: "Certificate",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/encoders/certificate"
      },
      {
        key: "sub3-4",
        label: "GZIP",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/encoders/gzip"
      },
      {
        key: "sub3-5",
        label: "HTML",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/encoders/html"
      },
      {
        key: "sub3-6",
        label: "JWT",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/encoders/jwt"
      },
      {
        key: "sub3-7",
        label: "QR Code",
        iconLeft: <HomeIcon fontSize="small" />,
        iconRight: <EmojiObjectsIcon fontSize="small" />,
        link: "/pages/encoders/qr-code"
      },
      {
        key: "sub3-8",
        label: "URL",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/encoders/url"
      },
    ],
  },
  {
    key: "sub4",
    label: "Formatters",
    iconLeft: <HomeIcon fontSize="small" />,
    iconRight: <KeyboardArrowDownIcon fontSize="small" />,
    link: "/pages/formatters",
    children: [
      {
        key: "sub4-1",
        label: "JSON",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/formatters/json"
      },
      // {
      //   key: "sub4-2",
      //   label: "SQL",
      //   iconLeft: <HomeIcon fontSize="small" />,
      // },
      {
        key: "sub4-3",
        label: "XML",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/formatters/xml"
      },
    ],
  },
  {
    key: "sub5",
    label: "Generators",
    iconLeft: <HomeIcon fontSize="small" />,
    iconRight: <KeyboardArrowDownIcon fontSize="small" />,
    link: "/pages/generators",
    children: [
      {
        key: "sub5-1",
        label: "Hash / Checksum",
        iconLeft: <HomeIcon fontSize="small" />,
        iconRight: <EmojiObjectsIcon fontSize="small" />,
        link: "/pages/generators/hash-checksum",
      },
      {
        key: "sub5-2",
        label: "Lorem Ipsum",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/generators/lorem-ipsum",
      },
      {
        key: "sub5-3",
        label: "Password",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/generators/password",
      },
      {
        key: "sub5-4",
        label: "UUID",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/generators/uuid",
      },
    ],
  },
  {
    key: "sub6",
    label: "Graphic",
    iconLeft: <HomeIcon fontSize="small" />,
    iconRight: <KeyboardArrowDownIcon fontSize="small" />,
    link: "/pages/graphic",
    children: [
      {
        key: "sub6-1",
        label: "Color blindness Simulator",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/graphic/color-blindness-simulator",
      },
      {
        key: "sub6-2",
        label: "Image Converter",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/graphic/image-converter",
      },
    ],
  },
  {
    key: "sub7",
    label: "Testers",
    iconLeft: <HomeIcon fontSize="small" />,
    iconRight: <KeyboardArrowDownIcon fontSize="small" />,
    link: "/pages/testers",
    children: [
      {
        key: "sub7-1",
        label: "JSONpath",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/testers/json-path",
      },
      {
        key: "sub7-2",
        label: "RegEx",
        iconLeft: <HomeIcon fontSize="small" />,
        iconRight: <EmojiObjectsIcon fontSize="small" />,
        link: "/pages/testers/regex",
      },
      {
        key: "sub7-3",
        label: "XML",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/testers/xml",
      },
    ],
  },
  {
    key: "sub8",
    label: "Text",
    iconLeft: <HomeIcon fontSize="small" />,
    iconRight: <KeyboardArrowDownIcon fontSize="small" />,
    link: "/pages/text",
    children: [
      {
        key: "sub8-1",
        label: "Escape / Unescape",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/text/escape-unescape"
      },
      {
        key: "sub8-2",
        label: "List Compare",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/text/list-compare"
      },
      {
        key: "sub8-3",
        label: "Markdown Preview",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/text/markdown-preview"
      },
      // {
      //   key: "sub8-4",
      //   label: "Analyzer & Utilities",
      //   iconLeft: <HomeIcon fontSize="small" />,
      //   iconRight: (
      //     <EmojiObjectsIcon
      //       fontSize="small"
      //       sx={{ color: "yellow" }}
      //     />
      //   ),
      // },
      {
        key: "sub8-5",
        label: "Compare",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/text/compare"
      },
    ],
  },
  {
    key: "sub8",
    label: "Tools",
    iconLeft: <HomeIcon fontSize="small" />,
    iconRight: <KeyboardArrowDownIcon fontSize="small" />,
    link: "/pages/tools",
    children: [
      {
        key: "sub8-1",
        label: "Currency Exchange",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/tools/currency-exchange"
      },
      {
        key: "sub8-2",
        label: "Crypto Currency Exchange",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/tools/crypto-currency-exchange"
      },
      {
        key: "sub8-3",
        label: "Scan Virus File",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/tools/scan-virus-file"
      },
      {
        key: "sub8-5",
        label: "Ip Geo Location",
        iconLeft: <HomeIcon fontSize="small" />,
        link: "/pages/tools/ip-geo-location"
      },
    ],
  },
];
