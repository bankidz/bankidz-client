import { createContext, ReactNode, useContext, useState } from 'react';

interface IMenuContext {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

const MenuContext = createContext<IMenuContext | undefined>(undefined);

interface MenuProps {
  defaultId?: string;
  children: ReactNode;
}

/**
 * - 선택된 값에 따라 binding된 UI를 랜더링 하는 로직을 추상화한 컴포넌트 입니다.
 * - 다수의 Menu.Header 버튼으로 이루어진 메뉴바를 구성하고,
 * 선택된 메뉴에 따라 랜더링될 Menu.Body를 지정합니다.
 * - Menu.Header와 Menu.Body는 id를 통해 binding 합니다.
 *
 * @param defaultId 기본으로 랜더링할 Menu.Body의 id
 *
 * @example
 * <StyledMenu defaultId="1">
 * <Menu.Header id="1">걷고있는 돈길</Menu.Header>
 * <Menu.Header id="2">지급 완료한 돈길</Menu.Header>
 * <Menu.Body id="1">
 *   <WalkingDongilList />
 * </Menu.Body>
 * <Menu.Body id="2">
 *   <PaidDongilList />
 * </Menu.Body>
 */
function Menu({ defaultId = '', children }: MenuProps) {
  const [opened, setOpened] = useState(defaultId);
  const value = { opened, setOpened };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export default Menu;

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error(
      'Menu compound components cannot be rendered outside the Menu component',
    );
  }
  return context;
};

/**
 * active 상태에 대한 스타일링 시 .active className을 활용합니다.
 *
 * @example
 * &.active {
 *   // ...
 * }
 */
function Header({ children, id }: { children: ReactNode; id?: string }) {
  const { opened, setOpened } = useMenuContext();
  return (
    <button
      onClick={() => {
        setOpened(id!);
      }}
      className={opened === id ? 'active' : undefined}
    >
      {children}
    </button>
  );
}
Menu.Header = Header;

function Body({ children, id }: { children: ReactNode; id?: string }) {
  const { opened } = useMenuContext();
  return <>{opened === id && children}</>;
}
Menu.Body = Body;
