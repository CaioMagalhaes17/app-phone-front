import React, { useEffect, useRef, useState } from 'react';
import { StoresInsideRadiusType } from '../../../../types/stores';
import { HSeparator, IconMail, IconPhone, IconStore, IconWhatsApp, Text } from '@app/ui';
import { Link } from 'react-router-dom';
import { getWppLink } from '../../../../utils/get-wpp-link';
import { Star } from 'lucide-react';

export function StoreSheet({ selectedStore }: { selectedStore: StoresInsideRadiusType | null | undefined }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState('max'); // 'min' ou 'max'
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!dragStartY || !sheetRef.current) return;
    const currentY = e.changedTouches[0].clientY;
    const diffY = currentY - dragStartY;

    const newPosition = diffY > 50 ? 'min' : 'max'; // Threshold
    setPosition(newPosition);

    // Reset transform with transition
    const sheet = sheetRef.current;
    const translateY = newPosition === 'min' ? window.innerHeight * 0.6 : 0;
    console.log(translateY)
    sheet.style.transition = 'transform 0.3s';
    sheet.style.transform = `translateY(${translateY}px)`;

    setTimeout(() => {
      if (sheet) {
        sheet.style.transition = '';
      }
    }, 300);

    setDragStartY(null);
  };

  useEffect(() => {
    if (selectedStore) {
      const sheet = document.getElementById('sheet')
      if (sheet) {
        console.log("ndanoidas")
        setPosition('max')
        sheet.style.transition = 'transform 0.3s';
        sheet.style.transform = `translateY(${0}px)`;
      }
    }
  }, [selectedStore])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={sheetRef}
        className={`absolute bottom-0 w-full bg-white !shadow-[0_-10px_6px_-1px_rgba(39,39,39,0.18)] rounded-t-2xl pointer-events-auto ${position === 'max' ? 'scrollable' : ''}`}
        style={{
          height: '70%',
          transform: `translateY(${window.innerHeight * 0.6}px)`,
        }}
        id="sheet"

      >
        <div onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd} className="w-full h-10 flex justify-center py-2">
          <div className="w-12 h-1.5 bg-gray-400 rounded-full"></div>
        </div>
        <div className="p-4 ">
          <h2 className="text-lg font-bold mb-2">{selectedStore ? selectedStore.profile.name : 'Selecione uma Loja'}</h2>
          {
            selectedStore ? (
              <>
                <div className="w-full flex flex-col font-semibold">
                  <div className="items-center flex justify-center">
                    <img className="h-full w-full rounded-xl" src={selectedStore.profile.profileImg} />
                  </div>
                  <div className="p-2 flex w-full text-left font-bold text-white gap-2 flex-col">
                    <Text className="text-lg text-black dark:text-white" as="span">{selectedStore.profile.name}</Text>
                    <HSeparator className="mt-1" />
                    <Text className="text-white-dark flex flex-row justify-between items-center" as="span">
                      Aberta/Fechada
                      <Text className="text-dark dark:text-white ml-auto" as="span">Distância: {Math.floor(selectedStore.distance) >= 1000 ? `${Math.floor(Math.floor(selectedStore.distance) / 1000)} km` : `${Math.floor(selectedStore.distance)} m`}</Text>
                    </Text>
                    <div className="flex flex-row">{[...Array(5)].map((_, index) => (
                      <Star
                        absoluteStrokeWidth={true}
                        key={index}
                        className={index < selectedStore.profile.rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                        size={20}
                      />
                    ))}</div>
                    <HSeparator className="mt-1" />
                    <div className="flex flex-row text-dark dark:text-white gap-5">
                      <label className=" flex items-center gap-2 block">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded-full"
                          checked
                          disabled
                          style={{ backgroundColor: 'currentcolor' }}
                        />
                        <span className="text-md ">Possui entregas</span>
                      </label>
                      <label className="text-md flex items-center gap-2 block">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded-full"
                          checked
                          disabled
                          style={{ backgroundColor: 'currentcolor' }}
                        />
                        <span className="">Rápidos orçamentos</span>
                      </label>

                    </div>
                    <div className="flex flex-row text-dark dark:text-white gap-5">
                      <label className="text-md flex items-center gap-2 block">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded-full"
                          checked
                          disabled
                          style={{ backgroundColor: 'currentcolor' }}
                        />
                        <span className="">Rápidos orçamentos</span>
                      </label>
                      <label className="text-md flex items-center gap-2 block">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded-full"
                          checked
                          disabled
                          style={{ backgroundColor: 'currentcolor' }}
                        />
                        <span className="">Rápidos orçamentos</span>
                      </label>
                    </div>
                  </div>
                  <HSeparator className="mt-5" />


                  <Link target="_blank" rel="noopener noreferrer" to={`/store-profile/${selectedStore.profile.id}`} className="btn btn-primary flex flex-row w-full gap-5 mt-5">
                    <IconStore />
                    Ir para o perfil da loja
                  </Link>
                  <HSeparator className="mt-5" />


                  <div className="flex flex-col  items-center mt-5">
                    <Text className="text-dark dark:text-white text-center text-lg mb-5" as="span">{selectedStore.profile.address}</Text>
                    <Link target="_blank" to={getWppLink('storeProfile', selectedStore.contacts.wppNum)} className="btn btn-green flex flex-row gap-2 mb-5"><IconWhatsApp />Chamar no Whatsapp</Link>
                    <Text className="text-dark dark:text-white text-xl flex flex-row gap-2 items-center" as="span"><IconPhone />{selectedStore.contacts.telNum}</Text>
                    <Text className="text-dark dark:text-white text-xl mb-10 flex flex-row gap-2 items-center" as="span"><IconMail />{selectedStore.contacts.email}</Text>
                  </div>
                </div>


              </>
            ) : (
              <p className="text-sm text-gray-600">
                Selecione uma loja
              </p>
            )
          }
        </div>
      </div>
    </div >
  );
};
