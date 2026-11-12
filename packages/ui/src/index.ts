// @1to1/ui: componentes React del sistema de diseño de 1to1 Digital Solutions.
// Los estilos van aparte: importa "@1to1/ui/styles.css" una vez en la app.
export { cx, type Tone } from "./components/utils";
export { Button, type ButtonProps } from "./components/Button";
export { LinkedInIcon } from "./components/BrandIcons";
export { Toggle, Navbar, Tabs, type NavbarProps, type NavLink, type TabsProps, type ToggleProps } from "./components/Navigation";
export {
  Eyebrow,
  Bracketed,
  HeroTitle,
  SectionHeading,
  StakeCard,
  ProcessSteps,
  Checklist,
  Accordion,
  PriceCard,
  CtaCard,
} from "./components/Marketing";
export { TextField, TextArea, SelectField, Checkbox, Radio, Switch, Slider } from "./components/Forms";
export { Badge, Tag, Alert, Toast, Dialog } from "./components/Feedback";
export { DataTable, StatCard, EmptyState, Skeleton, type Column } from "./components/Data";
export {
  Material,
  MaterialPreview,
  MATERIAL_SIZES,
  MatEyebrow,
  MatTitle,
  MatSubtitle,
  MatText,
  MatNumber,
  DocPage,
  type MaterialFormat,
} from "./materials/Materials";
