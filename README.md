![badge](https://img.shields.io/badge/mendix-7.5.1-green.svg)

![badge](https://img.shields.io/badge/mobile-friendly-green.svg)

# Swipeable Tabs 📱

Full-width, swipeable tabs, like Whatsapp or Venmo, complete with animations, and swipe-to-change-tab
![392408CA-BB04-4448-A2D1-2E2E12E8B2DB](./assets/392408CA-BB04-4448-A2D1-2E2E12E8B2DB.png)

![F326FE87-F795-4010-AAAD-86ABE9163E0D](/assets/F326FE87-F795-4010-AAAD-86ABE9163E0D.png)

### Installation

1. Install the widget in your project
2. Include the **Swiper** widget on a page as a sibling of a tab container you'd like to display as full-width
    ![191C6391-67F2-49A7-B4FB-B55AD17D4EEF](./assets/191C6391-67F2-49A7-B4FB-B55AD17D4EEF.png)
3. Configure the widget:

+ `Active Marker Color` : CSS color for the active-marker (the little slidey bar)
+ `Show Pagination` : Set to **No** to hide the tab headers. Useful if you want to just have users swipe between tabs as "pages"
+ `Tabs Background Color` : CSS color for the background of the tabs. defaults to `whitesmoke`
+ `Tabs Class (To Add)` : a class name to add to the tab headers `ul` 

### Styling

Classes to Override:

`.swiper-pagination-bullet-active` is the active tab header.

`.swiper-pagination-bullet` is each tab header (each `li` in the `ul` that can be styled by `Tabs Class (To Add)` above)

### Typical usage scenario

- When a mobile app has multiple pages and you'd prefer a swipeable tab menu to act as the main navigation

### Known Limitations

+ Doesn't behave well with large numbers of tabs ☹️

###### Based on the Mendix Widget Boilerplate

See [AppStoreWidgetBoilerplate](https://github.com/mendix/AppStoreWidgetBoilerplate/) for an example
