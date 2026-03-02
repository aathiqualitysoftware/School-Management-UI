package com.lrs.exception;

public enum ErrorCode implements ErrorHandle {
	SVS_ERR_0001(0001, "Error mapping request object to json"),
	SVS_ERR_0003(0003, "Role Not Mapped.."),
	SVS_ERR_0004(0004, "Invalid Role.."),
	SVS_ERR_0005(0005, "Invalid UserName.."),
	SVS_ERR_0006(0006, "No Data Found.."),
	SVS_ERR_0007(0007, "Classes Not available.."),
	SVS_ERR_0017(0017, "Section Not available.."),
	SVS_ERR_0020(0020, "Academic Year Not available.."),
	SVS_ERR_0010(0010, "Gender Not available.."),
	SVS_ERR_0011(0011, "Religion Not available.."),
	SVS_ERR_0012(0012, "Category Not available.."),
	SVS_ERR_0013(0013, "Blood Group Not available.."),
	SVS_ERR_0014(0014, "Native Language Not available.."),
	SVS_ERR_0015(0015, "Nationality Not available.."),
	SVS_ERR_0016(0016, "Student Data Not available.."),
	SVS_ERR_0021(0021, "Time Table Config Data Not available.."),
	SVS_ERR_0022(0022, "INTERNAL SERVER ERROR"),
	SVS_ERR_0023(0023, "School Info not found.."),
	SVS_ERR_0024(0024, "Grade Info Data Not available.."),
	SVS_ERR_0025(0025, "Exam Types Data Not available.."),
	SVS_ERR_0026(0026, "Exam Data Not available.."),
	SVS_ERR_0027(0027, "Exam Results Data Not available.."),
	SVS_ERR_0030(0030, "Class Subject Data Not available.."),
	SVS_ERR_0031(0031, "Exam Schedule Data Not available.."),
	SVS_ERR_0032(0032, "Classes Data Not available.."),
	SVS_ERR_0002(0002, "The Given user Dont have access");

	
	private final int errorCode;
	private  String message;

	ErrorCode(int errorCode, String message) {
		this.errorCode = errorCode; 
		this.message = message;
	}

	@Override
	public int getErrorCode() {
		return this.errorCode;
	}

	@Override
	public String getMessage() {
		return this.message;
	}

}
