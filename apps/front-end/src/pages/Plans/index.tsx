import { Button, Panel, Text } from "@app/ui";
import useStore from "../../state";

export function StorePlans() {
  const { storeInfos } = useStore()
  const plans = [
    {
      id: '1',
      name: "Básico",
      price: "R$49,00/mês",
      features: [
        "Benefício 1 do plano básico",
        "Benefício 2 do plano básico",
        "Benefício 3 do plano básico",
      ],
    },
    {
      id: '2',
      name: "Médio",
      price: "R$69,00/mês",
      features: [
        "Benefício 1 do plano médio",
        "Benefício 2 do plano médio",
        "Benefício 3 do plano médio",
      ],
    },
    {
      id: '3',
      name: "Premium",
      price: "R$99,00/mês",
      features: [
        "Benefício 1 do plano premium",
        "Benefício 2 do plano premium",
        "Benefício 3 do plano premium",
      ],
    },
  ];
  return (
    <div className="w-full items-center font-extrabold justify-center flex flex-col">
      <Text className="text-5xl mb-5 text-black dark:text-white" as="h1">Planos</Text>
      <Panel>
        <div id="plans" className="flex font-extrabold flex-col items-center justify-center p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 dark:bg-black text-center sombra transition-all"
              >
                <h3 className="text-3xl font-extrabold dark:text-white text-black">{plan.name}</h3>
                <p className="text-xl font-bold text-green mt-2">{plan.price}</p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-white-dark">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-lg">
                      ✅ {feature}
                    </li>
                  ))}
                </ul>
                <Button className={`mt-6 w-full ${plan.id !== storeInfos.subscriptionPlanId ? 'btn-outline-primary' : 'btn-primary'}`}>
                  {plan.id !== storeInfos.subscriptionPlanId ? `Assinar ${plan.name}` : 'Plano Atual'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  )
}