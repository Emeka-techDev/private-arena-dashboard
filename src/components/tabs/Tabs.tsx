import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';
import { Button } from '../button/Button';

export interface TabType {
  title: string;
  id: string;
  icon?: ReactNode;
}

interface TabProps {
  tabItems: TabType[];
  currentTab: TabType;
  handleChangeTab: (item: TabType) => void;
  className?: string;
  getActiveTab: (isActive: boolean) => string;
  tabClassName?: string;
}

export const Tabs = ({
  tabItems,
  currentTab,
  handleChangeTab,
  className,
  getActiveTab,
  tabClassName,
}: PropsWithChildren<TabProps>) => {
  return (
    <div className={clsx('flex items-center', className)}>
      {tabItems.map((item) => {
        const isActive = currentTab.id === item.id;
        return (
          <div key={item.id}>
            <Button
              className={clsx(
                'outline_button',
                tabClassName,
                getActiveTab(isActive),
              )}
              onClick={() => {
                handleChangeTab(item);
              }}
            >
              <span>{item.title}</span>
            </Button>
          </div>
        );
      })}
    </div>
  );
};
