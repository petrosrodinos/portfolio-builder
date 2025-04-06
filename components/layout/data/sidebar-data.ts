import {
  IconBrowserCheck,
  IconBug,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconNotification,
  IconPalette,
  IconUserCircle,
  IconTool,
  IconUserCog,
  IconDatabase,
  IconMail,
  IconLockPassword,
  IconCalendarDue,
  IconAlignBoxLeftStretch,
  IconFileInvoiceFilled,
  IconLanguage,
  IconLinkPlus,
  IconBriefcase,
  IconFolders,
  IconSchool,
  IconStars,
} from '@tabler/icons-react'
import { AudioWaveform, Command, CreditCard, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/console/dashboard',
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Portfolio',
          icon: IconDatabase,
          items: [
            {
              title: 'Profile',
              url: '/console/portfolio/profile',
              icon: IconUserCog,
            },
            {
              title: "Bio",
              url: "/console/portfolio/bio",
              icon: IconUserCircle,
            },
            {
              title: "Experience",
              url: "/console/portfolio/experience",
              icon: IconBriefcase,
            },
            {
              title: "Projects",
              url: "/console/portfolio/projects",
              icon: IconFolders,
            },
            {
              title: "Education",
              url: "/console/portfolio/education",
              icon: IconSchool,
            },
            {
              title: "Services",
              url: "/console/portfolio/services",
              icon: IconTool,
            },
            {
              title: "Skills",
              url: "/console/portfolio/skills",
              icon: IconStars,
            },
            {
              title: 'Links',
              url: '/console/portfolio/links',
              icon: IconLinkPlus,
            },
            {
              title: 'Languages',
              url: '/console/portfolio/languages',
              icon: IconLanguage,
            },
            {
              title: 'Appearance',
              url: '/console/portfolio/appearance',
              icon: IconPalette,
            },
            {
              title: 'Display',
              url: '/console/portfolio/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Account',
          icon: IconUserCircle,
          items: [
            {
              title: 'Profile',
              url: '/console/account/profile',
              icon: IconUserCog,
            },
            {
              title: 'Email',
              url: '/console/account/email',
              icon: IconMail,
            },
            {
              title: 'Password',
              url: '/console/account/password',
              icon: IconLockPassword,
            },
            {
              title: 'Appearance',
              url: '/console/account/appearance',
              icon: IconPalette,
            },
          ],
        },
        {
          title: 'Billing',
          icon: CreditCard,
          items: [
            {
              title: 'Subscription',
              url: '/console/billing/subscription',
              icon: IconCalendarDue,
            },
            {
              title: 'Plans',
              url: '/console/billing/plans',
              icon: IconAlignBoxLeftStretch,
            },
            {
              title: 'invoices',
              url: '/console/billing/invoices',
              icon: IconFileInvoiceFilled,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLock,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
