import { FaHandHoldingUsd, FaShieldAlt, FaShippingFast, FaStar } from "react-icons/fa";
import { Benefit } from "../types/TypesBenefits";

export const BENEFITS: Benefit[] = [
  {
    title: "Entrega Rápida",
    value: "48h",
    description: "Despacho express en productos seleccionados",
    Icon: FaShippingFast,
  },
  {
    title: "Garantía Extendida",
    value: "24 meses",
    description: "Cobertura adicional en todos nuestros productos",
    Icon: FaShieldAlt,
  },
  {
    title: "Pago Seguro",
    value: "100% seguro",
    description: "Solo pagas al recibir tu pedido",
    Icon: FaHandHoldingUsd,
  },
  {
    title: "Descuentos por Fidelidad",
    value: "Hasta 20%",
    description: "Beneficios exclusivos para clientes recurrentes",
    Icon: FaStar,
  }
];