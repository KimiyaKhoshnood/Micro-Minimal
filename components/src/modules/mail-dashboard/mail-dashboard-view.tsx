import { useCallback, useEffect } from "react";
import { fToNow, useBoolean, useResponsive } from "../../hooks/hooks";
import { DashboardContent } from "../dashboard/dashboard/layout";
import { alpha as hexAlpha, Avatar, Box, Button, ButtonBase, Checkbox, Collapse, darken, Drawer, IconButton, InputAdornment, lighten, Link, ListItemButton, ListItemText, Skeleton, Stack, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { Iconify } from "../../component/iconify/iconify";
import { Scrollbar } from "../../component/scrollbar/scrollbar";
import { EmptyContent } from "../../component/empty-content/empty-content";
import { stylesMode, varAlpha } from "../../theme/styles/utils";
import { FileThumbnail } from "../../upload/components/preview-multi-file";
import { Markdown } from "../../component/markdown/markdown";
import { Editor } from "../../component/editor/editor";
import { fDateTime } from "../../post/newest-booking";
import { maxLine } from "../../theme/styles/mixins";
import { Label } from "../../component/label/label";
import { LoadingScreen } from "../../component/loading-screen/loading-screen";

// ----------------------------------------------------------------------

const LABEL_INDEX = 'inbox';

const LABEL_ICONS: any = {
    all: 'fluent:mail-24-filled',
    inbox: 'solar:inbox-bold',
    trash: 'solar:trash-bin-trash-bold',
    drafts: 'solar:file-text-bold',
    spam: 'solar:danger-bold',
    sent: 'iconamoon:send-fill',
    starred: 'eva:star-fill',
    important: 'material-symbols:label-important-rounded',
    social: 'solar:tag-horizontal-bold-duotone',
    promotions: 'solar:tag-horizontal-bold-duotone',
    forums: 'solar:tag-horizontal-bold-duotone',
};

// ----------------------------------------------------------------------

const MailDashboardView = () => {
    // const router = useRouter();

    const theme: any = useTheme();

    // const searchParams = useSearchParams();

    const showAttachments = useBoolean(true);

    // const selectedLabelId = searchParams.get('label') ?? LABEL_INDEX;
    const selectedLabelId = LABEL_INDEX;

    // const selectedMailId = searchParams.get('id') ?? '';
    const selectedMailId = '';

    const mdUp = useResponsive('up', 'md');

    const openNav = useBoolean();

    const openMail = useBoolean();

    const openCompose = useBoolean();

    // const { labels, labelsLoading, labelsEmpty } = useGetLabels();
    const labels = [
        {
            "id": "all",
            "type": "system",
            "name": "all",
            "unreadCount": 3
        },
        {
            "id": "inbox",
            "type": "system",
            "name": "inbox",
            "unreadCount": 1
        },
        {
            "id": "sent",
            "type": "system",
            "name": "sent",
            "unreadCount": 0
        },
        {
            "id": "drafts",
            "type": "system",
            "name": "drafts",
            "unreadCount": 0
        },
        {
            "id": "trash",
            "type": "system",
            "name": "trash",
            "unreadCount": 0
        },
        {
            "id": "spam",
            "type": "system",
            "name": "spam",
            "unreadCount": 1
        },
        {
            "id": "important",
            "type": "system",
            "name": "important",
            "unreadCount": 1
        },
        {
            "id": "starred",
            "type": "system",
            "name": "starred",
            "unreadCount": 1
        },
        {
            "id": "social",
            "type": "custom",
            "name": "social",
            "unreadCount": 0,
            "color": "#00AB55"
        },
        {
            "id": "promotions",
            "type": "custom",
            "name": "promotions",
            "unreadCount": 2,
            "color": "#FFC107"
        },
        {
            "id": "forums",
            "type": "custom",
            "name": "forums",
            "unreadCount": 1,
            "color": "#FF4842"
        }
    ]
    const labelsLoading = false
    const labelsEmpty = false

    // const { mails, mailsLoading, mailsError, mailsEmpty } = useGetMails(selectedLabelId);
    const mails = {
        "byId": {
            "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1": {
                "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                "to": [
                    {
                        "name": "Jaydon Frankie",
                        "email": "demo@minimals.cc",
                        "avatarUrl": null
                    },
                    {
                        "name": "Brycen Jimenez",
                        "email": "tyrel.greenholt@gmail.com",
                        "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-13.webp"
                    }
                ],
                "from": {
                    "name": "Jayvion Simon",
                    "email": "nannie.abernathy70@yahoo.com",
                    "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp"
                },
                "folder": "inbox",
                "labelIds": [],
                "attachments": [],
                "createdAt": "2025-07-26T06:47:15+00:00",
                "subject": "The Future of Renewable Energy: Innovations and Challenges Ahead",
                "isUnread": false,
                "isImportant": true,
                "message": "Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.",
                "isStarred": true
            },
            "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6": {
                "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
                "to": [
                    {
                        "name": "Jaydon Frankie",
                        "email": "demo@minimals.cc",
                        "avatarUrl": null
                    },
                    {
                        "name": "Brycen Jimenez",
                        "email": "tyrel.greenholt@gmail.com",
                        "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-13.webp"
                    }
                ],
                "from": {
                    "name": "Lainey Davidson",
                    "email": "aditya.greenfelder31@gmail.com",
                    "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-6.webp"
                },
                "folder": "inbox",
                "labelIds": [
                    "social"
                ],
                "attachments": [
                    {
                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",
                        "name": "cover-4.jpg",
                        "path": "https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-4.webp",
                        "preview": "https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-4.webp",
                        "size": 9600000,
                        "createdAt": "2025-07-22T02:47:15+00:00",
                        "modifiedAt": "2025-07-22T02:47:15+00:00",
                        "type": "jpg"
                    },
                    {
                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
                        "name": "cover-6.jpg",
                        "path": "https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-6.webp",
                        "preview": "https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-6.webp",
                        "size": 8000000,
                        "createdAt": "2025-07-21T01:47:15+00:00",
                        "modifiedAt": "2025-07-21T01:47:15+00:00",
                        "type": "jpg"
                    },
                    {
                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
                        "name": "large-news.txt",
                        "path": "https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt",
                        "preview": "https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt",
                        "size": 6857142.857142857,
                        "createdAt": "2025-07-20T00:47:15+00:00",
                        "modifiedAt": "2025-07-20T00:47:15+00:00",
                        "type": "txt"
                    },
                    {
                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
                        "name": "nauru-6015-small-fighter-left-gender.psd",
                        "path": "https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd",
                        "preview": "https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd",
                        "size": 6000000,
                        "createdAt": "2025-07-18T23:47:15+00:00",
                        "modifiedAt": "2025-07-18T23:47:15+00:00",
                        "type": "psd"
                    },
                    {
                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9",
                        "name": "tv-xs.doc",
                        "path": "https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc",
                        "preview": "https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc",
                        "size": 5333333.333333333,
                        "createdAt": "2025-07-17T22:47:15+00:00",
                        "modifiedAt": "2025-07-17T22:47:15+00:00",
                        "type": "doc"
                    },
                    {
                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10",
                        "name": "gustavia-entertainment-productivity.docx",
                        "path": "https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx",
                        "preview": "https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx",
                        "size": 4800000,
                        "createdAt": "2025-07-16T21:47:15+00:00",
                        "modifiedAt": "2025-07-16T21:47:15+00:00",
                        "type": "docx"
                    }
                ],
                "createdAt": "2025-07-21T01:47:15+00:00",
                "subject": "Mental Health in the Digital Age: Navigating Social Media and Well-being",
                "isUnread": false,
                "isImportant": true,
                "message": "Non rerum modi. Accusamus voluptatem odit nihil in. Quidem et iusto numquam veniam culpa aperiam odio aut enim. Quae vel dolores. Pariatur est culpa veritatis aut dolorem.",
                "isStarred": false
            },
            "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7": {
                "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
                "to": [
                    {
                        "name": "Jaydon Frankie",
                        "email": "demo@minimals.cc",
                        "avatarUrl": null
                    },
                    {
                        "name": "Brycen Jimenez",
                        "email": "tyrel.greenholt@gmail.com",
                        "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-13.webp"
                    }
                ],
                "from": {
                    "name": "Cristopher Cardenas",
                    "email": "lenna.bergnaum27@hotmail.com",
                    "avatarUrl": null
                },
                "folder": "inbox",
                "labelIds": [],
                "attachments": [],
                "createdAt": "2025-07-20T00:47:15+00:00",
                "subject": "Sustainable Fashion: How the Industry is Going Green",
                "isUnread": false,
                "isImportant": false,
                "message": "Est enim et sit non impedit aperiam cumque animi. Aut eius impedit saepe blanditiis. Totam molestias magnam minima fugiat.",
                "isStarred": false
            },
            "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8": {
                "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
                "to": [
                    {
                        "name": "Jaydon Frankie",
                        "email": "demo@minimals.cc",
                        "avatarUrl": null
                    },
                    {
                        "name": "Brycen Jimenez",
                        "email": "tyrel.greenholt@gmail.com",
                        "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-13.webp"
                    }
                ],
                "from": {
                    "name": "Melanie Noble",
                    "email": "luella.ryan33@gmail.com",
                    "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-8.webp"
                },
                "folder": "inbox",
                "labelIds": [],
                "attachments": [],
                "createdAt": "2025-07-18T23:47:15+00:00",
                "subject": "Space Exploration: New Frontiers and the Quest for Extraterrestrial Life",
                "isUnread": false,
                "isImportant": false,
                "message": "Unde a inventore et. Sed esse ut. Atque ducimus quibusdam fuga quas id qui fuga.",
                "isStarred": false
            },
            "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9": {
                "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9",
                "to": [
                    {
                        "name": "Jaydon Frankie",
                        "email": "demo@minimals.cc",
                        "avatarUrl": null
                    },
                    {
                        "name": "Brycen Jimenez",
                        "email": "tyrel.greenholt@gmail.com",
                        "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-13.webp"
                    }
                ],
                "from": {
                    "name": "Chase Day",
                    "email": "joana.simonis84@gmail.com",
                    "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-9.webp"
                },
                "folder": "inbox",
                "labelIds": [],
                "attachments": [],
                "createdAt": "2025-07-17T22:47:15+00:00",
                "subject": "The Evolution of E-Commerce: Trends Shaping the Online Retail Landscape",
                "isUnread": false,
                "isImportant": false,
                "message": "Eaque natus adipisci soluta nostrum dolorem. Nesciunt ipsum molestias ut aliquid natus ut omnis qui fugiat. Dolor et rem. Ut neque voluptatem blanditiis quasi ullam deleniti.",
                "isStarred": true
            }
        },
        "allIds": [
            "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
            "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
            "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
            "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
            "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9"
        ]
    }
    const mailsLoading = false
    const mailsError = undefined
    const mailsEmpty = false

    // const { mail, mailLoading, mailError } = useGetMail(selectedMailId);

    const mail = {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
        "to": [
            {
                "name": "Jaydon Frankie",
                "email": "demo@minimals.cc",
                "avatarUrl": null
            },
            {
                "name": "Brycen Jimenez",
                "email": "tyrel.greenholt@gmail.com",
                "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-13.webp"
            }
        ],
        "from": {
            "name": "Jayvion Simon",
            "email": "nannie.abernathy70@yahoo.com",
            "avatarUrl": "https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp"
        },
        "folder": "inbox",
        "labelIds": [],
        "attachments": [],
        "createdAt": "2025-07-26T06:48:48+00:00",
        "subject": "The Future of Renewable Energy: Innovations and Challenges Ahead",
        "isUnread": false,
        "isImportant": true,
        "message": "Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.",
        "isStarred": true
    }
    const mailLoading = false
    const mailError = undefined

    const firstMailId = mails.allIds[0] || '';

    const handleToggleCompose = useCallback(() => {
        if (openNav.value) {
            openNav.onFalse();
        }
        openCompose.onToggle();
    }, [openCompose, openNav]);

    const handleClickLabel = useCallback(
        (labelId: any) => {
            if (!mdUp) {
                openNav.onFalse();
            }

            // if (labelId) {
            //     const href =
            //         labelId !== LABEL_INDEX
            //             ? `${paths.dashboard.mail}?label=${labelId}`
            //             : paths.dashboard.mail;
            //     router.push(href);
            // }
        },
        // [openNav, router, mdUp]
        [openNav, mdUp]
    );

    const handleClickMail = useCallback(
        (mailId: any) => {
            if (!mdUp) {
                openMail.onFalse();
            }

            // const href =
            //     selectedLabelId !== LABEL_INDEX
            //         ? `${paths.dashboard.mail}?id=${mailId}&label=${selectedLabelId}`
            //         : `${paths.dashboard.mail}?id=${mailId}`;

            // router.push(href);
        },
        // [openMail, router, selectedLabelId, mdUp]
        [openMail, selectedLabelId, mdUp]
    );

    useEffect(() => {
        if (mailsError || mailError) {
            // router.push(paths.dashboard.mail);
        }
        // }, [mailError, mailsError, router]);
    }, [mailError, mailsError]);

    useEffect(() => {
        if (!selectedMailId && firstMailId) {
            handleClickMail(firstMailId);
        }
    }, [firstMailId, handleClickMail, selectedMailId]);

    useEffect(() => {
        if (openCompose.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [openCompose.value]);


    if (mailsLoading || mailLoading) {
        return <LoadingScreen />;
    }

    if (mailsEmpty || !mail) {
        return (
            <EmptyContent
                title="No conversation selected"
                description="Select a conversation to read"
                imgUrl={`/assets/icons/empty/ic-email-selected.svg`}
            />
        );
    }


    const mailNavRenderLoading = (
        <Stack sx={{ flex: '1 1 auto', px: { xs: 2.5, md: 1.5 } }}>
            <MailNavItemSkeleton />
        </Stack>
    );

    const mailListRenderLoading = (
        <Stack sx={{ px: 2, flex: '1 1 auto' }}>
            <MailItemSkeleton />
        </Stack>
    );

    const mailNavRenderEmpty = (
        <Stack sx={{ flex: '1 1 auto', px: { xs: 2.5, md: 1.5 } }}>
            <EmptyContent
                title="No labels"
                imgUrl={`/assets/icons/empty/ic-folder-empty.svg`}
            />
        </Stack>
    );

    const mailListRenderEmpty = (
        <Stack sx={{ px: 2, flex: '1 1 auto' }}>
            <EmptyContent
                title={`Nothing in ${selectedLabelId}`}
                description="This folder is empty"
                imgUrl={`/assets/icons/empty/ic-folder-empty.svg`}
            />
        </Stack>
    );

    const mailNavRenderList = (
        <Scrollbar sx={{ flex: '1 1 0' }}>
            <nav>
                <Box
                    component="ul"
                    sx={{
                        pb: 1.5,
                        px: { xs: 1.5, md: 0.5 },
                    }}
                >
                    {labels.map((label: any) => (
                        <Box component="li" sx={{ display: 'flex' }}>
                            <ListItemButton
                                disableGutters
                                onClick={() => {
                                    handleClickLabel(label.id);
                                }}
                                sx={{
                                    pl: 1,
                                    pr: 1.5,
                                    gap: 2,
                                    borderRadius: 0.75,
                                    color: 'text.secondary',
                                    ...(selectedLabelId === label.id && { color: 'text.primary' }),
                                }}
                                key={label.id}
                            >
                                <Iconify icon={LABEL_ICONS[label.id]} width={22} sx={{ color: label.color }} />

                                <Box
                                    component="span"
                                    sx={{
                                        flexGrow: 1,
                                        textTransform: 'capitalize',
                                        typography: selectedLabelId === label.id ? 'subtitle2' : 'body2',
                                    }}
                                >
                                    {label.name}
                                </Box>

                                {!!label.unreadCount && (
                                    <Box component="span" sx={{ typography: 'caption' }}>
                                        {label.unreadCount}
                                    </Box>
                                )}
                            </ListItemButton>
                        </Box>
                    ))}
                </Box>
            </nav>
        </Scrollbar>
    );

    const mailListRenderList = (
        <Scrollbar sx={{ flex: '1 1 0' }}>
            <nav>
                <Box
                    component="ul"
                    sx={{
                        px: 2,
                        pb: 1,
                        gap: 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {mails.allIds.map((mailId: any) => (
                        <Box component="li" sx={{ display: 'flex' }}>
                            <ListItemButton
                                disableGutters
                                sx={{
                                    p: 1,
                                    gap: 2,
                                    borderRadius: 1,
                                    ...(selectedMailId === mailId && { bgcolor: 'action.selected' }),
                                }}
                                key={mailId}
                                onClick={() => {
                                    handleClickMail(mailId);
                                }}
                            >
                                <Avatar alt={mail.from.name} src={mail.from.avatarUrl ?? ''}>
                                    {mail.from.name.charAt(0).toUpperCase()}
                                </Avatar>

                                <ListItemText
                                    primary={mail.from.name}
                                    primaryTypographyProps={{ noWrap: true, component: 'span', variant: 'subtitle2' }}
                                    secondary={mail.message}
                                    secondaryTypographyProps={{
                                        noWrap: true,
                                        component: 'span',
                                        variant: mail.isUnread ? 'subtitle2' : 'body2',
                                        color: mail.isUnread ? 'text.primary' : 'text.secondary',
                                    }}
                                />

                                <Stack alignItems="flex-end" sx={{ alignSelf: 'stretch' }}>
                                    <Typography
                                        noWrap
                                        variant="body2"
                                        component="span"
                                        sx={{ mb: 1.5, fontSize: 12, color: 'text.disabled' }}
                                    >
                                        {fToNow(mail.createdAt)}
                                    </Typography>

                                    {!!mail.isUnread && (
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: 'info.main',
                                            }}
                                        />
                                    )}
                                </Stack>
                            </ListItemButton>
                        </Box>
                    ))}
                </Box>
            </nav>
        </Scrollbar>
    );

    const mailNavRenderContent = (
        <>
            <Stack sx={{ p: { xs: 2.5, md: theme.spacing(2, 1.5) } }}>
                <Button
                    fullWidth
                    color="inherit"
                    variant="contained"
                    startIcon={<Iconify icon="solar:pen-bold" />}
                    onClick={handleToggleCompose}
                >
                    Compose
                </Button>
            </Stack>

            {labelsLoading ? mailNavRenderLoading : <>{labelsEmpty ? mailNavRenderEmpty : mailNavRenderList}</>}
        </>
    );

    const mailListRenderContent = (
        <>
            <Stack sx={{ p: 2 }}>
                {mdUp ? (
                    <TextField
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                ) : (
                    <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                        {selectedLabelId}
                    </Typography>
                )}
            </Stack>

            {mailsLoading || labelsLoading ? mailListRenderLoading : <>{mailsEmpty ? mailListRenderEmpty : mailListRenderList}</>}
        </>
    );

    // 

    const renderHead = (
        <>
            <Stack direction="row" spacing={1} flexGrow={1}>
                {mail.labelIds.map((labelId: any) => {
                    const label : any = labels.filter((label: any) => label.id === labelId)[0];

                    return label ? (
                        <Label
                            key={label.id}
                            sx={{
                                color: darken(label.color, 0.24),
                                bgcolor: hexAlpha(label.color, 0.16),
                                [stylesMode.dark]: { color: lighten(label.color, 0.24) },
                            }}
                        >
                            {label.name}
                        </Label>
                    ) : null;
                })}
            </Stack>

            <Stack direction="row" alignItems="center">
                <Checkbox
                    color="warning"
                    icon={<Iconify icon="eva:star-outline" />}
                    checkedIcon={<Iconify icon="eva:star-fill" />}
                    checked={mail.isStarred}
                    inputProps={{ id: 'starred-checkbox', 'aria-label': 'Starred checkbox' }}
                />

                <Checkbox
                    color="warning"
                    icon={<Iconify icon="material-symbols:label-important-rounded" />}
                    checkedIcon={<Iconify icon="material-symbols:label-important-rounded" />}
                    checked={mail.isImportant}
                    inputProps={{ id: 'important-checkbox', 'aria-label': 'Important checkbox' }}
                />

                <Tooltip title="Archive">
                    <IconButton>
                        <Iconify icon="solar:archive-down-minimlistic-bold" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Mark Unread">
                    <IconButton>
                        <Iconify icon="fluent:mail-unread-20-filled" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Trash">
                    <IconButton>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                </Tooltip>

                <IconButton>
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
            </Stack>
        </>
    );

    const renderSubject = (
        <>
            <Typography variant="subtitle2" sx={{ ...maxLine({ line: 2 }), flex: '1 1 auto' }}>
                Re: {mail.subject}
            </Typography>

            <Stack spacing={0.5}>
                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                    <IconButton size="small">
                        <Iconify width={18} icon="solar:reply-bold" />
                    </IconButton>

                    <IconButton size="small">
                        <Iconify width={18} icon="solar:multiple-forward-left-broken" />
                    </IconButton>

                    <IconButton size="small">
                        <Iconify width={18} icon="solar:forward-bold" />
                    </IconButton>
                </Stack>

                <Typography variant="caption" noWrap sx={{ color: 'text.disabled' }}>
                    {fDateTime(mail.createdAt)}
                </Typography>
            </Stack>
        </>
    );

    const renderSender = (
        <>
            <Avatar
                alt={mail.from.name}
                src={mail.from.avatarUrl ? `${mail.from.avatarUrl}` : ''}
                sx={{ mr: 2 }}
            >
                {mail.from.name.charAt(0).toUpperCase()}
            </Avatar>

            <Stack spacing={0.5} sx={{ width: 0, flexGrow: 1 }}>
                <Stack spacing={0.5} direction="row">
                    <Typography component="span" variant="subtitle2" sx={{ flexShrink: 0 }}>
                        {mail.from.name}
                    </Typography>
                    <Typography component="span" noWrap variant="body2" sx={{ color: 'text.secondary' }}>
                        {`<${mail.from.email}>`}
                    </Typography>
                </Stack>

                <Typography noWrap component="span" variant="caption" sx={{ color: 'text.secondary' }}>
                    {`To: `}
                    {mail.to.map((person: any) => (
                        <Link key={person.email} color="inherit" sx={{ '&:hover': { color: 'text.primary' } }}>
                            {`${person.email}, `}
                        </Link>
                    ))}
                </Typography>
            </Stack>
        </>
    );

    const renderAttachments = (
        <Stack spacing={1} sx={{ p: 1, borderRadius: 1, bgcolor: 'background.neutral' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <ButtonBase
                    onClick={showAttachments.onToggle}
                    sx={{ borderRadius: 0.5, typography: 'caption', color: 'text.secondary' }}
                >
                    <Iconify icon="eva:attach-2-fill" sx={{ mr: 0.5 }} />
                    {mail.attachments.length} attachments
                    <Iconify
                        icon={
                            showAttachments.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'
                        }
                        width={16}
                        sx={{ ml: 0.5 }}
                    />
                </ButtonBase>

                <ButtonBase
                    sx={{
                        py: 0.5,
                        gap: 0.5,
                        px: 0.75,
                        borderRadius: 0.75,
                        typography: 'caption',
                        fontWeight: 'fontWeightSemiBold',
                    }}
                >
                    <Iconify width={18} icon="eva:cloud-download-fill" /> Download
                </ButtonBase>
            </Stack>

            <Collapse in={showAttachments.value} unmountOnExit timeout="auto">
                <Stack direction="row" flexWrap="wrap" spacing={0.75}>
                    {mail.attachments.map((attachment: any) => (
                        <FileThumbnail
                            key={attachment.id}
                            tooltip
                            imageView
                            file={attachment.preview}
                            onDownload={() => console.info('DOWNLOAD')}
                            sx={{ width: 48, height: 48, backgroundColor: 'background.neutral' }}
                            slotProps={{ icon: { width: 24, height: 24 } }}
                        />
                    ))}
                </Stack>
            </Collapse>
        </Stack>
    );

    const renderContent = (
        <Markdown children={mail.message} sx={{ px: 2, '& p': { typography: 'body2' } }} />
    );

    const renderEditor = (
        <>
            <Editor sx={{ maxHeight: 320 }} />

            <Stack direction="row" alignItems="center">
                <IconButton>
                    <Iconify icon="solar:gallery-add-bold" />
                </IconButton>

                <IconButton>
                    <Iconify icon="eva:attach-2-fill" />
                </IconButton>

                <Stack flexGrow={1} />

                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<Iconify icon="iconamoon:send-fill" />}
                >
                    Send
                </Button>
            </Stack>
        </>
    );

    return (
        <>
            <DashboardContent
                maxWidth={false}
                sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}
            >
                <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                    Mail
                </Typography>

                <Stack
                    sx={{
                        p: 1,
                        borderRadius: 2,
                        flex: '1 1 auto',
                        bgcolor: 'background.neutral',
                    }}>
                    {/* MailHeader done */}
                    <Stack direction="row" alignItems="center" sx={{ py: 1, mb: 1, display: { md: 'none' } }}>
                        <IconButton onClick={openNav.onTrue}>
                            <Iconify icon="fluent:mail-24-filled" />
                        </IconButton>

                        {mailsEmpty ? undefined : openMail.onTrue && (
                            <IconButton onClick={mailsEmpty ? undefined : openMail.onTrue}>
                                <Iconify icon="solar:chat-round-dots-bold" />
                            </IconButton>
                        )}

                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ ml: 2 }}
                        />
                    </Stack>

                    <Stack spacing={1} direction="row" sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
                        {/*  */}
                        <Stack
                            sx={{
                                flex: '0 0 200px',
                                overflow: 'hidden',
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {mailNavRenderContent}

                            <Drawer
                                open={openNav.value}
                                onClose={openNav.onFalse}
                                slotProps={{ backdrop: { invisible: true } }}
                                PaperProps={{ sx: { width: 280 } }}
                            >
                                {mailNavRenderContent}
                            </Drawer>
                        </Stack>

                        {/*  */}
                        <Stack
                            sx={{
                                borderRadius: 1.5,
                                flex: '0 0 320px',
                                overflow: 'hidden',
                                bgcolor: 'background.default',
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {mailListRenderContent}

                            <Drawer
                                open={openMail.value}
                                onClose={openMail.onFalse}
                                slotProps={{ backdrop: { invisible: true } }}
                                PaperProps={{ sx: { width: 320 } }}
                            >
                                {mailListRenderContent}
                            </Drawer>
                        </Stack>

                        {/*  */}
                        <Stack
                            sx={{
                                minWidth: 0,
                                flex: '1 1 auto',
                                borderRadius: 1.5,
                                overflow: 'hidden',
                                bgcolor: 'background.default',
                            }}
                        >
                            {/* <MailDetails
                                mail={mail}
                                empty={mailsEmpty}
                                loading={mailsLoading || mailLoading}
                                renderLabel={(id: any) => labels.filter((label: any) => label.id === id)[0]}
                            /> */}

                            <Stack direction="row" alignItems="center" flexShrink={0} sx={{ pl: 2, pr: 1, height: 56 }}>
                                {renderHead}
                            </Stack>

                            <Stack
                                spacing={2}
                                flexShrink={0}
                                direction="row"
                                sx={{
                                    p: 2,
                                    borderTop: `1px dashed ${theme.vars.palette.divider}`,
                                    borderBottom: `1px dashed ${theme.vars.palette.divider}`,
                                }}
                            >
                                {renderSubject}
                            </Stack>

                            <Stack flexShrink={0} direction="row" alignItems="center" sx={{ pt: 2, px: 2 }}>
                                {renderSender}
                            </Stack>

                            {!!mail.attachments.length && <Stack sx={{ px: 2, mt: 2 }}> {renderAttachments} </Stack>}

                            <Scrollbar sx={{ mt: 3, flex: '1 1 240px' }}>{renderContent}</Scrollbar>

                            <Stack flexShrink={0} spacing={2} sx={{ p: 2 }}>
                                {renderEditor}
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </DashboardContent>

            {/* {openCompose.value && <MailCompose onCloseCompose={openCompose.onFalse} />} */}
        </>
    );
}

export default MailDashboardView


export function MailNavItemSkeleton({ amount = 6, sx, ...other }: { amount?: any, sx?: any, [other: string]: any }) {
    return [...Array(amount)].map((_, index) => (
        <Stack
            key={index}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ py: 1, color: (theme: any) => varAlpha(theme.vars.palette.grey['500Channel'], 0.24), ...sx }}
            {...other}
        >
            <Skeleton variant="circular" sx={{ width: 32, height: 32, bgcolor: 'currentColor' }} />

            <Skeleton sx={{ width: 0.5, height: 10, bgcolor: 'currentColor' }} />
        </Stack>
    ));
}

// ----------------------------------------------------------------------

export function MailItemSkeleton({ amount = 6, sx, ...other }: { amount?: any, sx?: any, [other: string]: any }) {
    return [...Array(amount)].map((_, index) => (
        <Stack
            key={index}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ py: 1, ...sx }}
            {...other}
        >
            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />

            <Stack spacing={1} flexGrow={1}>
                <Skeleton sx={{ width: 0.75, height: 10 }} />
                <Skeleton sx={{ width: 0.5, height: 10 }} />
            </Stack>
        </Stack>
    ));
}