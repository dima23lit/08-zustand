import css from '@/app/notes/filter/@sidebar/SidebarNotes.module.css'
import Link from "next/link";

const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default async function SidebarNotes() {

    return <ul className={css.menuList}>
                    {TAGS.map((tag) => (
                        <li className={css.menuItem} key={tag}>
                            <Link
                                href={tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`}
                                className={css.menuLink}>
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
}