import styles from "./post.module.css";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";
import { formatDate } from "../../utils/helpers";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { Skeleton } from "../../components/skeleton/skeleton.component";
import { BottomSheet } from "../../components/bottom-sheet/bottom-sheet.component";
import { ReportType, type Cafe } from "../../entities/types";
import { CreateReport } from "../../components/create-report/create-report.component";

export const PostPage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    cafeStore: { cafe },
    postStore: { post, getPost, isPostLoading },
  } = useContext(Context);

  const [bottomSheet, setBottomSheet] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [media, setMedia] = useState("");
  const [cafeData, setCafeData] = useState<Cafe | null>();
  const [createdAt, setCreatedAt] = useState<Date>();

  if (!id) {
    navigate("/");
    return;
  }

  useEffect(() => {
    if (cafe && +id) getPost(cafe.id, +id);
  }, [cafe, id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setText(post.text);
      setMedia(post.media[0]);
      setCafeData(post.cafe);
      setCreatedAt(post.createdAt);
    }
  }, [post]);

  return (
    <>
      {isPostLoading && !post ? (
        <Skeleton />
      ) : (
        <div className={styles.postPage}>
          <section className={styles.header}>
            <img src={cafeData?.avatar} />
            <h5>{cafeData?.name}</h5>
            <DropdownMenu
              elements={[
                {
                  text: "Пожаловаться",
                  onClick: () =>
                    setBottomSheet(
                      <CreateReport
                        type={ReportType.POST}
                        onClose={() => setBottomSheet(null)}
                      />
                    ),
                },
              ]}
            />
          </section>
          <section className={styles.media}>
            <img src={media} />
          </section>
          <section className={styles.info}>
            <div className={styles.infoContent}>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
            <div>
              <span>{createdAt ? formatDate(new Date(createdAt)) : <></>}</span>
            </div>
          </section>
        </div>
      )}
      <BottomSheet isOpen={bottomSheet} onClose={() => setBottomSheet(null)}>
        {bottomSheet}
      </BottomSheet>
    </>
  );
});
