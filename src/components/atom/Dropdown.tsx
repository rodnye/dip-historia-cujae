import cx from 'classix';
import { JSX, RefObject } from 'react';
import styled from 'styled-components';

interface Props extends React.PropsWithChildren {
  show: boolean;
  children: JSX.Element;
  nodeRef: RefObject<HTMLElement | null>;
}

export function Dropdown({ show, children, nodeRef }: Props) {
  return (
    <StyledWrapper
      className="w-full"
      $height={
        nodeRef.current ? nodeRef.current.getBoundingClientRect().height : 0
      }
    >
      <div
        className={cx(
          'w-full overflow-hidden transition-all duration-300',
          !show ? 'h-0' : 'h-real',
        )}
      >
        {children}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ $height: number }>`
  .h-real {
    height: ${(props) => props.$height}px;
  }
`;
