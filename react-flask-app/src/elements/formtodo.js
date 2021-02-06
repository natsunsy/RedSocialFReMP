import React, {useState} from 'react'
import { GrAdd } from "react-icons/gr";

export default function FormToDo({handleAddItem,styles,placeholder,done}) {
    const [description, setDescription] = useState("");
    const userId = localStorage.getItem("userId")
    const handleSubmit = (e) =>{
        e.preventDefault();
        handleAddItem({
            userId:userId,
            description,
            done:done,
            date: new Date().toLocaleDateString('ja', {
                year:  'numeric',
                month: '2-digit',
                day:   '2-digit'
            }).replace(/\//g, '-')
        })
        setDescription("")
    }
    return (
        <form className={styles.form_diario} onSubmit={handleSubmit}>
            <input
            placeholder={placeholder}
            className={styles.question_diario}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button className={styles.btn} type="submit" disabled={description ? "" : "disabled"}><GrAdd/></button>
        </form>
    )
}
