import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";
import styles from "./choose-priorities.module.css";
import { useContext, useEffect, useState } from "react";
import {
  valuesDesc,
  type Criteria,
  type CriteriaUser,
} from "../../entities/types";
import { ColorButton } from "../../components/color-button/color-button.component";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import { Skeleton } from "../../components/skeleton/skeleton.component";
import { useNavigate } from "react-router-dom";
import { Select } from "../../components/select/select.component";

export const ChoosePriorities = observer(() => {
  const navigate = useNavigate();
  const [criteriaOrder, setCriteriaOrder] = useState<
    { key: string; label: string; weight: number }[]
  >([]);
  const [criteria, setCriteria] = useState<string>("");

  const {
    userStore: {
      getUser,
      user,
      isUserLoading,
      editUserCriteria,
      getCriteriaList,
      criteriaList,
      isCriteriaLoading,
    },
  } = useContext(Context);

  useEffect(() => {
    getUser();
    getCriteriaList();
  }, []);

  useEffect(() => {
    setCriteria(criteriaList[0]?.name);
  }, [criteriaList]);

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
    (acc, item, idx) => ({ ...acc, [item.label]: valuesDesc[idx] }),
    {} as Criteria
  );

  const convertToCriteriaOrder = (userCriteria: CriteriaUser[]) => {
    return userCriteria
      .sort((a, b) => b.weight - a.weight)
      .map((item) => ({
        key: item.criteria.id.toString(),
        label: item.criteria.name,
        weight: item.weight,
      }));
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

  const onClickAddCriteria = () => {
    if (criteriaOrder.find((el) => el.key === criteria)) return;
    setCriteriaOrder([
      ...criteriaOrder,
      { key: criteria, label: criteria, weight: 1 },
    ]);
  };

  if (isUserLoading || isCriteriaLoading) {
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
      <div className={styles.choosePrioritiesSelect}>
        <Select
          city={criteria}
          setCity={setCriteria}
          items={criteriaList.map((el) => ({
            key: el.name,
            value: el.name,
          }))}
          isAll={false}
        />
        <ColorButton
          text={"+"}
          onClick={onClickAddCriteria}
          disabled={criteriaOrder.length > 3}
        />
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
      <div className={styles.choosePrioritiesButton}>
        <ColorButton
          styleProps={{ backgroundColor: "rgb(var(--danger-color))" }}
          text={"Очистить"}
          onClick={() => setCriteriaOrder([])}
        />
        <ColorButton text={"Сохранить"} onClick={onClickSaveButton} />
      </div>
    </div>
  );
});
