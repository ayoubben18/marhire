# Mission 4: Sticky Booking Form

## Status
Current: Completed

## Objective
Make the booking form component (`BookingFrm`) sticky to the top of the window when scrolling, ensuring it remains accessible while users browse the listing details.

## Dependencies
- Previous missions: Mission 3 completed (layout restructure)
- External: None - using existing CSS positioning capabilities
- Components: BookingFrm component already exists and functions properly

## Architecture Plan

### Current State Analysis
- BookingFrm is currently positioned in `.listing-container__right`
- The form is a complex multi-step component with ~50+ state variables
- Uses MUI Dialog for multi-step booking process
- Container uses a two-column layout structure

### Proposed Implementation

#### 1. CSS Positioning Strategy
- Apply `position: sticky` to the booking form container
- Set `top` offset to account for navbar height (80px as per Mission 1)
- Ensure proper z-index layering to avoid overlaps
- Maintain responsive behavior on mobile devices

#### 2. Container Structure
```css
.listing-container__right {
  position: sticky;
  top: 90px; /* 80px navbar + 10px padding */
  height: fit-content;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
```

#### 3. Mobile Responsiveness
- On mobile (< 768px): Form should be position static (not sticky)
- On tablet/desktop (>= 768px): Apply sticky positioning
- Ensure form doesn't overlap with footer on short content pages

#### 4. Browser Compatibility
- Use standard `position: sticky` (supported in all modern browsers)
- Add vendor prefixes if needed for older browser support
- Test in Chrome, Firefox, Safari, and Edge

## Implementation

### Phase 1: Update Listing Page Styles
1. Modify existing CSS for `.listing-container__right`
2. Add sticky positioning with appropriate offsets
3. Implement responsive breakpoints

### Phase 2: Handle Edge Cases
1. Ensure form doesn't extend beyond viewport on smaller screens
2. Add scroll behavior for long forms within sticky container
3. Test with different listing content lengths

### Phase 3: Testing & Refinement
1. Test sticky behavior across different screen sizes
2. Verify no z-index conflicts with other components
3. Ensure smooth scrolling performance

## Files Modified
- `/resources/css/app.css` - Added sticky positioning to `.listing-container__right` in media queries for screens >= 1367px

## Testing
- [x] Sticky behavior works on desktop (>= 1367px)
- [x] Form is not sticky on tablet (768px - 1366px) - displays stacked instead
- [x] Form is not sticky on mobile (< 768px) - displays stacked
- [x] No overlap with navbar (90px top offset)
- [x] No overlap with footer
- [x] Smooth scrolling performance
- [x] Added subtle shadow for visual separation
- [x] Max-height constraint with overflow-y for long forms

## Success Criteria
- Booking form remains visible and accessible while scrolling through listing details
- No layout issues or overlapping elements
- Responsive behavior maintained across all device sizes
- Performance not impacted by sticky positioning

## Notes
- The sticky positioning should enhance UX by keeping the booking action always accessible
- Must maintain the existing booking form functionality
- Consider adding a subtle shadow to the sticky form for better visual separation