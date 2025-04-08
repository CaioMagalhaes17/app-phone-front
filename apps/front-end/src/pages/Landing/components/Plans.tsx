import { Button, IconVerified } from "@app/ui";

export default function PricingTable() {
  const plans = [
    {
      name: "Básico",
      price: "R$29,00/mês",
      features: [
        "Benefício 1 do plano básico",
        "Benefício 2 do plano básico",
        "Benefício 3 do plano básico",
      ],
    },
    {
      name: "Médio",
      price: "R$49,00/mês",
      features: [
        "Benefício 1 do plano médio",
        "Benefício 2 do plano médio",
        "Benefício 3 do plano médio",
      ],
    },
    {
      name: "Premium",
      price: "R$69,00/mês",
      features: [
        "Benefício 1 do plano premium",
        "Benefício 2 do plano premium",
        "Benefício 3 do plano premium",
      ],
    },
  ];

  return (
    <div id="plans" className="flex font-bold flex-col items-center justify-center p-6">
      <h2 className="text-2xl text-dark dark:text-white mb-8 flex flex-row gap-5 items-center"><IconVerified />Planos para Lojas/Assistências técnicas</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 dark:bg-black text-center sombra transition-all"
          >
            <h3 className="text-3xl font-bold dark:text-white text-black">{plan.name}</h3>
            <p className="text-xl font-bold text-green mt-2">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-white-dark">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-lg">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full btn-outline-primary">
              Assinar {plan.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
