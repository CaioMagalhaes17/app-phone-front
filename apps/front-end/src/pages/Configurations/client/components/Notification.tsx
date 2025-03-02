import { SwitchBox } from "../../../../components/SwitchBox";

export function NotificationConfigs() {

  const notificationConfigs = [
    {
      type: 'send-whatsapp',
      title: 'Enviar Notificações por WhatsApp?',
      description: 'buceta mulher pelada',
      isActive: true,
    },
    {
      type: 'send-sms',
      title: 'Enviar Notificações por SMS',
      description: 'buceta mulher pelada',
      isActive: true,
    },
    {
      type: 'send-email',
      title: 'Enviar Notificações por E-mail?',
      description: 'buceta mulher pelada',
      isActive: true,
    }
  ]


  return (
    <>
      <div className="w-[1200px] ml-auto mr-auto">
        <div className="font-extrabold flex w-full flex-row gap-5">
          {notificationConfigs.map((item) => {
            return (
              <SwitchBox onChange={(valor) => console.log(valor)} description={item.description} title={item.title} isActive={item.isActive} />
            )
          })}
        </div>
      </div>
    </>
  )
}