import { IconMoon, IconSun } from "@app/ui";
import useStore from "../../state";

export function ChooseTheme() {
  const { theme, setTheme } = useStore()
  return (
    <>
      {theme === 'light' ? (
        <button
          id="theme-lt-dk"
          className={`${theme === 'light' &&
            'flex items-center p-2 rounded-full text-dark hover:text-black hover:dark:text-white'
            }`}
          onClick={() => {
            setTheme('dark')
          }}
        >
          <IconSun />
        </button>
      ) : (
        ''
      )}
      {theme === 'dark' && (
        <button
          id="theme-lt-dk"
          className={`${theme === 'dark' &&
            'flex items-center p-2 dark:text-white rounded-full hover:text-white '
            }`}
          onClick={() => {
            setTheme('light')
          }}
        >
          <IconMoon />
        </button>
      )}
    </>
  )
}