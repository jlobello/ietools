import IEToolWrapperVersion from "IEToolWrapperVersion";

export default class IEToolWrapperModule {
  constructor(browserTools) {
    this._browserTools = browserTools;
    this._name = null;
  }

  load(callback, moduleBase, errorCallback) {
    const req = {
      name: "IETools.IEToolsWrapper",
      architecture: "Any",
      version: "1.0.+",
      forceExternal: false /*, true for installAndLoadModule ??
      url: `${moduleBase}/Cerner.BrowserTools.Module.SignaturePad.zip/${SignaturePadVersion.version}/Cerner.BrowserTools.Module.SignaturePad.zip`, */
    };
    //this._browserTools.hostModule.installAndLoadModule(
    this._browserTools.hostModule.loadModule((data) => {
        this._name = data.moduleKey;
        callback(data);
      },
      req,
      errorCallback
    );
  }
  loadFromWeb(callback, moduleBase, errorCallback) {
    moduleBase = "https://jlobello.github.io/ietools";
    const req = {
      name: "IETools.IEToolsWrapper",
      architecture: "Any",
      version: `${IEToolWrapperVersion.version}+`,
      forceExternal: true,
      url: `${moduleBase}/IEToolsWrapper.zip/${IEToolWrapperVersion.version}/IEToolsWrapper.zip`,
    };
    //this._browserTools.hostModule.loadModule((data) => {
    this._browserTools.hostModule.installAndLoadModule((data) => {
        this._name = data.moduleKey;
        callback(data);
      },
      req,
      errorCallback
    );
  }
  IETools_get_version(callback, errorCallback) { 
    const msg = { "module": this._name, "opcode": "IETools.get_version"};
    this._browserTools.sendMessage(
      r => callback(r.data),
      msg,
      errorCallback);
  }

  IETools_get_machineWtsSid(callback, errorCallback) {
    const msg = { module: this._name, opcode: "IETools.get_machineWtsSid" };
    this._browserTools.sendMessage(
      r => callback(r.data),
      msg,
      errorCallback);
  }

  IETools_get_machineIP(callback, errorCallback) {
    const msg = { module: this._name, opcode: "IETools.get_machineIP" };
    this._browserTools.sendMessage(
      r => callback(r.data),
      msg,
      errorCallback);
  }

  IETools_get_machineNameEx(callback, wksFileKey, wksFileLoc, errorCallback) {
    const msg = {
      module: this._name,
      opcode: "IETools.get_machineNameEx",
      data: { wksFileKey, wksFileLoc },
    };
    this._browserTools.sendMessage(
      r => callback(r.data),
      msg,
      errorCallback);
  }
  
  GsmLaunch_get_version(callback, errorCallback) { 
    const msg = { "module": this._name, "opcode": "GsmLaunch.get_version"};
    this._browserTools.sendMessage(
      r => callback(r.data),
      msg,
      errorCallback);
  }

  GsmLaunch_NewProcess(callback, cmdline, errorCallback) {
    const msg = {
      module: this._name,
      opcode: "GsmLaunch.NewProcess",
      data: { cmdline },
    };
    this._browserTools.sendMessage(
      r => callback(r.data),
      msg,
      errorCallback);
  }

}