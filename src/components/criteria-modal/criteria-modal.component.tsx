import { useEffect, useState } from "react";
import styles from "./criteria-modal.module.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "react-beautiful-dnd";
import {
  initialCriteria,
  valuesDesc,
  type Criteria,
  type CriteriaOrder,
} from "../../entities/types";

export const CriteriaModal = ({
  isVisible = false,
  onClick,
  style = {},
  init = initialCriteria,
}: {
  isVisible: boolean;
  onClick: (criteria: Criteria) => void;
  style?: React.CSSProperties;
  init?: CriteriaOrder;
}) => {
  const [criteriaOrder, setCriteriaOrder] = useState(init || initialCriteria);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"; // Блокируем скролл
    } else {
      document.body.style.overflow = "auto"; // Восстанавливаем скролл
      document.body.style.overflowX = "hidden";
    }

    // Очистка эффекта при размонтировании
    return () => {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
    };
  }, [isVisible]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(criteriaOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCriteriaOrder(items);
  };

  const criteriaObject = criteriaOrder.reduce(
    (acc, item, idx) => ({ ...acc, [item.key]: valuesDesc[idx] }),
    { aroma: 1.0, atmosphere: 1.3, speed: 1.5, taste: 1.7 } as Criteria
  );

  return !isVisible ? null : (
    <div style={style} className={styles.criteriaModal}>
      <div
        className={styles.criteriaModalDialog}
        onClick={(e) => e.stopPropagation()}
      >
        <section className={styles.criteriaModalTitle}>
          <h3>Ваши предпочтения</h3>
          <h6>
            Переместите блоки ниже так, чтобы выше всех был наиболее важный
            показатель
          </h6>
        </section>
        <section>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="criteria-list">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {criteriaOrder.map((item, index) => (
                    <Draggable
                      key={item.key}
                      draggableId={item.key}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={styles.criteiaCharacterize}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            background: snapshot.isDragging
                              ? "#b8a1e3"
                              : undefined,
                            cursor: "grab",
                            userSelect: "none",
                          }}
                          key={index}
                        >
                          {item.label}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
        <section>
          <button type="button" onClick={() => onClick(criteriaObject)}>
            ОК
          </button>
        </section>
      </div>
    </div>
  );
};
