<?php
/**
 * Class DatainterfaceTestAbstract
 *
 * @created      24.11.2017
 * @author       Smiley <smiley@chillerlan.net>
 * @copyright    2017 Smiley
 * @license      MIT
 */

namespace chillerlan\QRCodeTest\Data;

use chillerlan\QRCode\Common\MaskPattern;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use PHPUnit\Framework\TestCase;
use chillerlan\QRCode\Data\{QRCodeDataException, QRData, QRMatrix};
use ReflectionClass;

use function str_repeat;

/**
 * The data interface test abstract
 */
abstract class DatainterfaceTestAbstract extends TestCase{

	protected ReflectionClass $reflection;
	protected QRData          $QRData;
	protected string          $FQN;
	protected string          $testdata;

	protected function setUp():void{
		$this->QRData     = new QRData(new QROptions(['version' => 4]));
		$this->reflection = new ReflectionClass($this->QRData);
	}

	/**
	 * Verifies the data interface instance
	 */
	public function testInstance():void{
		$this::assertInstanceOf(QRData::class, $this->QRData);
	}

	/**
	 * @see testInitMatrix()
	 * @return int[][]
	 */
	public function maskPatternProvider():array{
		return [[0], [1], [2], [3], [4], [5], [6], [7]];
	}

	/**
	 * Tests initializing the data matrix
	 *
	 * @dataProvider maskPatternProvider
	 */
	public function testInitMatrix(int $maskPattern):void{
		$this->QRData->setData([new $this->FQN($this->testdata)]);

		$matrix = $this->QRData->writeMatrix(new MaskPattern($maskPattern));

		$this::assertInstanceOf(QRMatrix::class, $matrix);
		$this::assertSame($maskPattern, $matrix->maskPattern()->getPattern());
	}

	/**
	 * Tests getting the minimum QR version for the given data
	 */
	public function testGetMinimumVersion():void{
		$this->QRData->setData([new $this->FQN($this->testdata)]);

		$getMinimumVersion = $this->reflection->getMethod('getMinimumVersion');
		$getMinimumVersion->setAccessible(true);

		$this::assertSame(1, $getMinimumVersion->invoke($this->QRData));
	}

	abstract public function stringValidateProvider():array;

	/**
	 * @dataProvider stringValidateProvider
	 */
	public function testValidateString(string $string, bool $expected):void{
		/** @noinspection PhpUndefinedMethodInspection */
		$this::assertSame($expected, $this->FQN::validateString($string));
	}

	/**
	 * Tests if an exception is thrown when the data exceeds the maximum version while auto detecting
	 */
	public function testGetMinimumVersionException():void{
		$this->expectException(QRCodeDataException::class);
		$this->expectExceptionMessage('data exceeds');

		$this->QRData = new QRData(
			new QROptions(['version' => QRCode::VERSION_AUTO]),
			[new $this->FQN(str_repeat($this->testdata, 1337))]
		);
	}

	/**
	 * Tests if an exception is thrown on data overflow
	 */
	public function testCodeLengthOverflowException():void{
		$this->expectException(QRCodeDataException::class);
		$this->expectExceptionMessage('code length overflow');

		$this->QRData->setData([new $this->FQN(str_repeat($this->testdata, 1337))]);
	}

	/**
	 * Tests if an exception is thrown when an invalid character is encountered
	 */
	public function testInvalidDataException():void{
		$this->expectException(QRCodeDataException::class);
		$this->expectExceptionMessage('invalid data');

		$this->QRData->setData([new $this->FQN('##')]);
	}

	/**
	 * Tests if an exception is thrown if the given string is empty
	 */
	public function testInvalidDataOnEmptyException():void{
		$this->expectException(QRCodeDataException::class);
		$this->expectExceptionMessage('invalid data');

		$this->QRData->setData([new $this->FQN('')]);
	}

}
