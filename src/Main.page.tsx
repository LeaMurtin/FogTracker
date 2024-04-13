import { AppShell, Burger, CSSProperties, Flex, Stack, Switch, SwitchStylesNames } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const switchStyles: Partial<Record<SwitchStylesNames, CSSProperties>> = {
  label: { fontSize: 'var(--mantine-font-size-md)', padding: 0 },
  track: { width: '80%', margin: 'auto' },
  body: { flexDirection: 'column-reverse', gap: 'var(--mantine-spacing-xs)' },
};

export function MainPage() {
  const [settingsOpened, { toggle: toggleLeftSection }] = useDisclosure();
  const [gpsOpened, { toggle: toggleRightSection }] = useDisclosure();

  return (
    <AppShell
      // layout="alt"
      header={{ height: 80 }}
      footer={{ height: 40 }}
      navbar={{
        width: 150,
        breakpoint: 'xs',
        collapsed: {
          mobile: !settingsOpened,
          desktop: !settingsOpened,
        },
      }}
      aside={{
        width: 350,
        breakpoint: 'xs',
        collapsed: {
          mobile: !gpsOpened,
          desktop: !gpsOpened,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex h="100%" px="md" justify="space-between" align="center">
          <Burger opened={settingsOpened} onClick={toggleLeftSection} size="sm" />
          <div>Header</div>
          <Burger opened={gpsOpened} onClick={toggleRightSection} size="sm" />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack justify="center">
          Settings
          <Switch label="Major Bosses" styles={switchStyles} />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>

      <AppShell.Aside p="md">Google Maps</AppShell.Aside>

      <AppShell.Footer p="xs">Footer</AppShell.Footer>
    </AppShell>
  );
}
