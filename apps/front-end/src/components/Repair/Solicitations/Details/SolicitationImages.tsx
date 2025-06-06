import { Panel, Text } from "@app/ui";
import { useState } from "react";
import Lightbox from 'react-image-lightbox'
import "react-image-lightbox/style.css";

export function SolicitationImages({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Panel className="mt-5 font-bold ">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <Text className="text-dark dark:text-white text-2xl" as="h1">Imagens do Celular:</Text>
            <div className="ml-auto"></div>
          </div>
          <div className="flex flex-row gap-10 mt-5">
            {
              images.length > 0 ? images.map((image, i) =>
                (<img onClick={() => { setIndex(i); setIsOpen(true); }} key={i} src={image} className="w-full h-[200px] cursor-pointer" />)
              ) : 'Sem imagens anexadas'
            }
          </div>
        </div>
      </Panel>
      {isOpen && (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[(index + 1) % images.length]}
          prevSrc={images[(index + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setIndex((index + images.length - 1) % images.length)}
          onMoveNextRequest={() => setIndex((index + 1) % images.length)}
        />
      )}
    </>
  )
}