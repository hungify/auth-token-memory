import { Box, Tab, Tabs } from 'grommet';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  {
    key: 'login',
    title: 'Login',
  },
  {
    key: 'register',
    title: 'Register',
  },
  {
    key: 'logout',
    title: 'Logout',
  },
  {
    key: 'user-list',
    title: 'User List',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const { pathname } = useLocation();
  useEffect(() => {
    const tab = pathname.split('/')[1];
    if (tab) {
      const index = tabs.findIndex((t) => t.key === tab);
      setActiveTab(index);
    }
  }, [pathname]);

  const handleTabActive = (index: number) => {
    const activeTab = tabs[index];
    activeTab && navigate(activeTab.key);
  };

  return (
    <Box align='center' pad='medium'>
      <Tabs onActive={handleTabActive} activeIndex={activeTab}>
        {tabs.map((tab) => (
          <Tab title={tab.title} key={tab.key}>
            <Outlet />
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
}
