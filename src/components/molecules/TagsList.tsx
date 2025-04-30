import { Link } from 'wouter';
import { Tag } from '../atom/Tag';

interface Props {
  tags: string[];
  redirect?: boolean;
}

export function TagsList({ tags, redirect = false }: Props) {
  return (
    <div className="flex flex-wrap items-center">
      {tags.map((tag) => (
        <Link aria-disabled={!redirect} to={'/search?q=' + tag} key={tag}>
          <Tag key={tag}>{tag}</Tag>
        </Link>
      ))}
    </div>
  );
}
