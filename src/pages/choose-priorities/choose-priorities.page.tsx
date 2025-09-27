import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";
import styles from "./choose-priorities.module.css";
import { useContext, useEffect, useState } from "react";
import {
  initialCriteria,
  valuesDesc,
  type Criteria,
} from "../../entities/types";
import { ColorButton } from "../../components/color-button/color-button.component";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import { Skeleton } from "../../components/skeleton/skeleton.component";
import { useNavigate } from "react-router-dom";

export const ChoosePriorities = observer(() => {
  const navigate = useNavigate();
  const [criteriaOrder, setCriteriaOrder] = useState(initialCriteria);

  const {
    userStore: { getUser, user, isUserLoading, editUserCriteria },
  } = useContext(Context);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user?.criteria) {
      setCriteriaOrder(convertToCriteriaOrder(user.criteria));
    }
  }, [user]);

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

  const convertToCriteriaOrder = (criteria: Criteria) => {
    return Object.entries(criteria)
      .sort(([, a], [, b]) => b - a)
      .map(([key]) => {
        const found = initialCriteria.find((item) => item.key === key);
        return { key: key as keyof Criteria, label: found?.label || key };
      });
  };

  const onClickSaveButton = async () => {
    if (!user?.criteria) {
      await editUserCriteria(criteriaObject);
      navigate("/");
    } else {
      await editUserCriteria(criteriaObject);
      navigate("/profile");
    }
  };

  if (isUserLoading) {
    return (
      <div className={styles.profilePage}>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className={styles.choosePriorities}>
      <div className={styles.choosePrioritiesInfo}>
        <h2>Выберите ваши предпочтения</h2>
        <p>
          Переместите блоки ниже так, чтобы выше всех был наиболее важный
          показатель.
        </p>
      </div>
      <div className={styles.choosePrioritiesDrag}>
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
                            ? "rgb(var(--accent-color))"
                            : undefined,
                          cursor: "grab",
                          userSelect: "none",
                          color: snapshot.isDragging
                            ? "rgb(var(--primary-color))"
                            : undefined,
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
      </div>
      <ColorButton text={"Сохранить"} onClick={onClickSaveButton} />
    </div>
  );
});
