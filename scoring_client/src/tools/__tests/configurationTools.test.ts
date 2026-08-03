import {describe, expect, it} from 'vitest';
import {createConfigurationName} from "../configurationTools.ts";

// region test suite: createConfigurationName

describe("createConfigurationName", () => {

  // -- empty configurations array ----------------------------------------------

  it("returns 'config 1' when the configurations array is empty", () => {
    const result = createConfigurationName([]);
    expect(result).toBe('config 1');
  });

  // -- sequential names -------------------------------------------------------

  it("skips existing names and returns 'config 2' when only 'config 1' exists", () => {
    const configurations = [{name: 'config 1'}];
    const result = createConfigurationName(configurations);
    expect(result).toBe('config 2');
  });

  it("skips existing names and returns 'config 3' when 'config 1' and 'config 2' exist", () => {
    const configurations = [
      {name: 'config 1'},
      {name: 'config 2'},
    ];
    const result = createConfigurationName(configurations);
    expect(result).toBe('config 3');
  });

  it("skips a gap in the middle and returns 'config 4' when 1, 2, and 4 exist", () => {
    const configurations = [
      {name: 'config 1'},
      {name: 'config 2'},
      {name: 'config 4'},
    ];
    const result = createConfigurationName(configurations);
    expect(result).toBe('config 3');
  });

  it("returns the next sequential name after a long gap (e.g. only 'config 5' exists)", () => {
    const configurations = [{name: 'config 5'}];
    const result = createConfigurationName(configurations);
    expect(result).toBe('config 1');
  });

  // -- non-sequential / unrelated names ---------------------------------------

  it("ignores entries whose name does not match the pattern 'config <number>'", () => {
    const configurations = [
      {name: 'my custom config'},
      {name: 'production-settings'},
    ];
    const result = createConfigurationName(configurations);
    expect(result).toBe('config 1');
  });

  it("ignores non-numeric name suffixes", () => {
    const configurations = [
      {name: 'config abc'},
      {name: 'config xyz'},
    ];
    const result = createConfigurationName(configurations);
    expect(result).toBe('config 1');
  });

  // -- duplicate names in array -----------------------------------------------

  it("handles duplicate entries with the same name", () => {
    const configurations = [
      {name: 'config 1'},
      {name: 'config 1'},
    ];
    const result = createConfigurationName(configurations);
    expect(result).toBe('config 2');
  });

  // -- large sequential arrays ------------------------------------------------

  it("correctly returns the next name for a large contiguous block", () => {
    const configurations = Array.from({length: 10_000}, (_, i) => ({
      name: `config ${i + 1}`,
    }));
    const result = createConfigurationName(configurations);
    expect(result).toBe('config 10001');
  });

  // -- mixed existing configurations ------------------------------------------

  it("returns the correct next name for a realistic mix of existing configs", () => {
    const configurations = [
      {name: 'default'},
      {name: 'config 2'},
      {name: 'staging'},
      {name: 'config 4'},
      {name: 'production'},
    ];
    const result = createConfigurationName(configurations);
    expect(result).toBe('config 1');
  });

});

// endregion
