package com.talaxy.moedaily;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class VersionModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;

  public VersionModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "VersionModule";
  }

  @ReactMethod
  public void getVersionName(Callback callback) {
    try {
      PackageInfo pInfo = reactContext.getPackageManager().getPackageInfo(reactContext.getPackageName(), 0);
      String versionName = pInfo.versionName;
      callback.invoke(null, versionName);
    } catch (PackageManager.NameNotFoundException e) {
      callback.invoke(e.getMessage(), null);
    }
  }
}