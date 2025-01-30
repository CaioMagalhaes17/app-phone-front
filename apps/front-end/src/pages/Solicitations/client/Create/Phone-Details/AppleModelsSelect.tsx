import { appleModels } from "../../../../../constants/solicitation-form-questions"

export function AppleModelsSelect() {
  return (
    <>
      <select className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
        {appleModels.map((item, index) => {
          return (
            <>
              <option key={index} value={item}>{item}</option>
            </>
          )
        })}
      </select>
    </>
  )
}