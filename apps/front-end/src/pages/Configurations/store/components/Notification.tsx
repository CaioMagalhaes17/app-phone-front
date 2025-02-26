import { Panel, Text } from "@app/ui";
import { useState } from "react";

export function NotificationConfigs() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <div className="w-[1200px] ml-auto mr-auto">
        <div className="font-extrabold flex w-full flex-row gap-5">
          <Panel className="w-full h-[150px] text-left flex flex-col">
            <Text className="text-white text-lg" as="span">Receber notificações por E-mail</Text>
            <div className="mt-auto" />
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${enabled ? "bg-primary" : "bg-gray-300"
                }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${enabled ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
          </Panel>
          <Panel className="w-full h-[150px] text-left flex flex-col">
            <Text className="text-white text-lg" as="span">Receber notificações por Whatsapp</Text>
            <div className="mt-auto" />
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${enabled ? "bg-primary" : "bg-gray-300"
                }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${enabled ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
          </Panel><Panel className="w-full h-[150px] text-left flex flex-col">
            <Text className="text-white text-lg" as="span">Receber notificações por E-mail</Text>
            <div className="mt-auto" />
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${enabled ? "bg-primary" : "bg-gray-300"
                }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${enabled ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
          </Panel>
        </div>
      </div>
    </>
  )
}