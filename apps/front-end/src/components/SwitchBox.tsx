import { Panel, Text } from "@app/ui";

export function SwitchBox({ title, description, onChange, isActive }: { title: string, description?: string, onChange: (isActive: boolean) => void, isActive: boolean }) {
  return (
    <>
      <Panel className="w-full h-[150px] text-left flex flex-col">
        <Text className="text-black dark:text-white text-lg" as="span">{title}</Text>
        <Text as="span" className="mt-2">
          {description}
        </Text>
        <div className="mt-auto" />
        <button
          onClick={() => onChange(!isActive)}
          className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${isActive ? "bg-primary" : "bg-gray-300"
            }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${isActive ? "translate-x-6" : "translate-x-1"
              }`}
          />
        </button>
      </Panel>
    </>
  )
}