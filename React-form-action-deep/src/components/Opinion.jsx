import { use,useOptimistic } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const {downvoteOpinion,upvoteOpinion} = use(OpinionsContext);

  const [optmisticVote,setOptmisticVote] = useOptimistic(votes,
    (prevState,mode) => mode === "up" ? prevState + 1 : prevState - 1
  );

  async function handleDownVote(){
    setOptmisticVote("down")
    await downvoteOpinion(id);
  }

  async function handleUpVote(){
    setOptmisticVote("up")
    await upvoteOpinion(id);
  }

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={handleUpVote} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optmisticVote}</span>

        <button formAction={handleDownVote}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
