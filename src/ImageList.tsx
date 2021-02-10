import React, { useRef } from "react";
import { useDrag, useDrop, DragObjectWithType } from "react-dnd";

const type = "Image"; // Need to pass which type element can be draggable

const Image = ({ image, index, moveImage }: any) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item: DragObjectWithType & { index: Array<number> }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      console.log("dragIndex: ", dragIndex);
      const hoverIndex = index;
      console.log("hoverIndex: ", hoverIndex);
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Move the content
      //moveImage(dragIndex, hoverIndex);
      // Update the index for dragged item directly to avoid flickering when half dragged
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type, id: image.src, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // initialize drag and drop into the element
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0 : 1, padding: 10 }}>
      <span>{image.src}</span>
    </div>
  );
};

const ImageList = ({ images, moveImage }: any) => {
  const renderImage = (images: any, index_row: any) => {
    return images.map((image: any, index_col: any) => (
      <Image
        image={image}
        index={[index_row, index_col]}
        key={`${image.src}-image`}
        moveImage={moveImage}
      />
    ));
  };

  return <div style={{ display: "flex" }}>{images.map(renderImage)}</div>;
};

export default ImageList;
