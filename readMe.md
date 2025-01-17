# WX Tables Plugin

A powerful and flexible table management plugin for WX Eclipse website builder that allows users to create and manage dynamic tables without writing code.

## Installation
From the WX Eclipse builder, go to the Plugins section and search for the WX Tables plugin.
Simply tap the install button and the plugin will be installed to your website.

## Features

- Visual table builder interface
- Dynamic column management
- Real-time data entry and preview
- Row-by-row data management
- Delete functionality for both columns and rows
- Automatic unique ID generation for data tracking
- Custom styling support via className integration

## Usage

1. Select a table component in the WX Eclipse builder
2. Use the Column Builder section to:
   - Add new columns with custom titles
   - Remove existing columns
   - Manage column structure

3. Use the Data Builder section to:
   - Add new rows of data
   - Edit existing row values
   - Preview data in real-time

## Component Structure

The table component stores data in the following format:
- Columns: Array of column definitions with titles and unique IDs
- Data: Array of row entries with unique IDs and field values
- Styling: Supports custom className for both table and rows

## Integration

The plugin integrates seamlessly with the WX Eclipse builder system using the `useBuilder` hook for state management and component updates.

## Dependencies

- React
- Font Awesome icons
- WX Eclipse builder core
- Custom CSS styling (main.css)

Note: The plugin is designed to work with the Table component provided by the WX Eclipse builder, and is therefor a dependency of that component.