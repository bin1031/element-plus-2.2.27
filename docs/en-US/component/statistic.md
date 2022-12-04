---
title: Statistic
lang: en-US
---

# Statistic

Display statistics.

## Basic usage

:::demo To highlight a number or a group of numbers, such as statistical value, amount, and ranking, you can add elements such as icon and unit before and after the number and title.

statistic/num

:::

## Countdown

:::demo Set `timeIndices`Start the countdown. Countdown component, support English and Chinese countdown, support to add other components control countdown.

statistic/countdown
:::
:::tip

In formatting it is suggested to be in the range of days

:::

## Card usage

:::demo Card usage display, can be freely combined

statistic/card

:::

## Statistic API

### Statistic Attributes

| Attribute         | Description                    | Type                                                                | Default |
| ----------------- | ------------------------------ | ------------------------------------------------------------------- | ------- |
| value             | Numerical content              | ^[string] / ^[number]                                               | —       |
| decimal-separator | Setting the decimal point      | ^[string]                                                           | —       |
| format            | Custom numerical presentation  | ^[string]                                                           | —       |
| group-separator   | Sets the thousandth identifier | ^[string]                                                           | ,       |
| precision         | numerical precision            | ^[number]                                                           | 0       |
| prefix            | Sets the prefix of a number    | ^[string]                                                           | —       |
| suffix            | Sets the suffix of a number    | ^[string]                                                           | —       |
| title             | Numeric titles                 | ^[string]                                                           | —       |
| value-style       | Styles numeric values          | ^[string] / ^[object]`CSSProperties \| CSSProperties[] \| string[]` |
| rate              | Set the ratio                  | ^[number]                                                           | 3       |

### Statistic Slots

| Name      | Description                 |
| --------- | --------------------------- |
| prefix    | Numeric prefix              |
| suffix    | Suffixes for numeric values |
| formatter | Numerical content           |
| title     | Numeric titles              |

### Statistic Exposes

| Name | Description            | Type                                 |
| ---- | ---------------------- | ------------------------------------ |
| ref  | Statistic html element | ^[Object]`Ref<HTMLStatisticElement>` |

## Countdown API

### Countdown Attributes

| Attribute    | Description                              | Type                          | Default |
| ------------ | ---------------------------------------- | ----------------------------- | ------- |
| time-indices | Whether to enable the countdown function | ^[boolean]`'true' \| 'false'` | false   |
| value        | Required value, enter the bound value    | ^[number] / ^[Date]           | —       |
| format       | Formatting the countdown display         | ^[string]`'' `                | —       |

### Countdown Events

| Method | Description                                | Type                                     |
| ------ | ------------------------------------------ | ---------------------------------------- |
| change | Enable in the 'countdown' function         | ^[Function]`() => Date`                  |
| finish | Launched after the 'countdown' is complete | ^[Function]`(event: FocusEvent) => void` |

<style lang="scss">
@use '../../examples/statistic/index.scss';
</style>
