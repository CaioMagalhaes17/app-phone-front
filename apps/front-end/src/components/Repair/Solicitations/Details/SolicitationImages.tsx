import { Button, IconPencil, Panel, Text } from "@app/ui";
import { useState } from "react";
import Lightbox from 'react-image-lightbox'
import "react-image-lightbox/style.css";
import { EditSolicitationImages } from "./EditSolicitationImages";

export function SolicitationImages({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false)
  return (
    <>
      {!editMode ? (
        <Panel className="mt-10 font-extrabold ">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Text className="text-dark dark:text-white text-2xl" as="h1">Imagens do Celular:</Text>
              <div className="ml-auto"></div>
              <Button onClick={() => setEditMode(true)} className="btn-primary"><IconPencil className="mr-2" />Editar Fotos</Button>
            </div>
            <div className="flex flex-row gap-10 mt-5">
              {images.map((image, i) =>
                (<img onClick={() => { setIndex(i); setIsOpen(true); }} key={i} src={image} className="w-full h-[200px] cursor-pointer" />)
              )}
            </div>
          </div>
        </Panel>
      ) : (
        <EditSolicitationImages images={images} setEditMode={setEditMode} solicitationId={'1'} />
      )}

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